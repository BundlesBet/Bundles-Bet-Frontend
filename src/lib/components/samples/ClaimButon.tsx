import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { contractDetails } from "config";
import { updateUserRewards } from "utils/apiCalls";

interface Props {
  containsReward: boolean;
  reward: number;
  userId: number;
  showClaimButton: boolean;
}

const ClaimButton = ({
  containsReward,
  reward,
  userId,
  showClaimButton,
}: Props) => {
  const router = useRouter();
  const poolId = router.query.id;

  const { config } = usePrepareContractWrite({
    address: contractDetails.betting.address,
    abi: contractDetails.betting.abi,
    chainId: contractDetails.betting.chainId,
    functionName: "claimReward(uint256)",
    args: [poolId],
  });

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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (await writeAsync?.())?.wait(3).then((value) => {
            backendClaimCall();
          });
        }}
        isDisabled={!containsReward || !showClaimButton}
      >
        {" "}
        Claim
      </Button>
    </Flex>
  );
};

export default ClaimButton;
