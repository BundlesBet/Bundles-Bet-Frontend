import { Button, Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { contractDetails } from "config";
import { updateUserRewards } from "utils/apiCalls";

interface Props {
  containsReward: boolean;
  reward: number;
  userId: number;
  showClaimButton: boolean;
  hasClaimedRewards: boolean;
  checkHasClaimed: () => void;
}

const ClaimButton = ({
  containsReward,
  reward,
  userId,
  showClaimButton,
  hasClaimedRewards,
  checkHasClaimed,
}: Props) => {
  const router = useRouter();
  const poolId = router.query.id;

  const [disableClaim, setDisableClaim] = useState(false);

  const { config } = usePrepareContractWrite({
    address: contractDetails.betting.address,
    abi: contractDetails.betting.abi,
    chainId: contractDetails.betting.chainId,
    functionName: "claimReward(uint256)",
    args: [poolId],
  });

  const toast = useToast();

  const { writeAsync } = useContractWrite(config);

  const backendClaimCall = async () => {
    await updateUserRewards({ userId, reward });
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Button
        bg="#0EB634"
        color="#111"
        onClick={async () => {
          setDisableClaim(true);

          toast({
            position: "top-right",
            title: "Processing transaction",
            description: "We are processing your transaction, please wait...",
            status: "info",
            duration: 4000,
            isClosable: true,
          });

          (await writeAsync?.())
            ?.wait(3)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((value) => {
              backendClaimCall();
              checkHasClaimed();
              setDisableClaim(false);

              toast({
                position: "top-right",
                title: "Reward claimed",
                description: "Reward claimed successfully.",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
              setDisableClaim(false);
              toast({
                position: "top-right",
                title: "Problem encountered",
                description:
                  "Problem in reward claiming, please try again later!",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            });
        }}
        isDisabled={
          !containsReward ||
          !showClaimButton ||
          hasClaimedRewards === true ||
          disableClaim
        }
      >
        {" "}
        {disableClaim ? "Claiming" : "Claim"}
      </Button>
    </Flex>
  );
};

export default ClaimButton;
