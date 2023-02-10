import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Button,
  TableCaption,
  TableContainer,
  Tag,
  Popover,
  PopoverArrow,
  Text,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  ButtonGroup,
  PopoverFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { formatInTimeZone } from "date-fns-tz";
import { forwardRef, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import CustomLink from "../common/CustomLink";
import { contractDetails } from "config";
import { uniqueID } from "utils";
import { cancelBet } from "utils/apiCalls";
import type { PoolWithBets } from "utils/interfaces";

interface TableProps {
  allBetsData: PoolWithBets[];
}
const ProfileShowAll = (props: TableProps) => {
  const { allBetsData } = props;

  const [betId, setBetId] = useState(0);
  const [poolId, setPoolId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [current, setCurrent] = useState(1);

  const toast = useToast();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts =
    allBetsData?.length === 0
      ? []
      : allBetsData.slice(offset, offset + pageSize);
  const header = ["Pool Creation Date", "Pool Name", "Bet Amount", "Status"];

  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Prev = forwardRef((forwardprops, ref: any) => {
    return (
      <Button ref={ref} {...forwardprops}>
        Prev
      </Button>
    );
  });
  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Next = forwardRef((forwardprops, ref: any) => {
    return (
      <Button ref={ref} {...forwardprops}>
        Next
      </Button>
    );
  });

  // eslint-disable-next-line consistent-return, @typescript-eslint/no-explicit-any
  const itemRender: any = (_: any, type: string) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };

  const popOverItems = (item: PoolWithBets) => {
    if (item.status === "ACTIVE") {
      return (
        <Button
          onClick={() => {
            onToggle();
            setBetId(item.id);
            setPoolId(item.poolId);
            setUserId(item.userId);
          }}
        >
          Cancel
        </Button>
      );
    }
    return (
      <Button isDisabled cursor="text">
        {item.status}
      </Button>
    );
  };

  const { config } = usePrepareContractWrite({
    address: contractDetails.betting.address,
    abi: contractDetails.betting.abi,
    chainId: contractDetails.betting.chainId,
    functionName: "cancelBet(uint256)",
    args: [poolId],
    enabled: Boolean(poolId > 0),
  });

  const { writeAsync } = useContractWrite(config);

  const cancelUserBet = async () => {
    try {
      onToggle();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (await writeAsync?.())?.wait(3).then(async (value) => {
        const body = {
          betId,
          poolId,
          userId,
        };

        await cancelBet(body);

        toast({
          position: "top-right",
          title: "Bet Cancelled",
          description: "Bet successfully cancelled.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <TableContainer w="full">
        <Table w="full" bg="#1C1C26">
          <TableCaption>
            <Pagination
              current={current}
              onChange={(page: number | undefined) => {
                setCurrent(page || 1);
              }}
              pageSize={pageSize}
              total={allBetsData && allBetsData.length}
              itemRender={itemRender}
              paginationProps={{
                display: "flex",
                pos: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              focusRing="#0EB634"
              baseStyles={{
                bg: "#0EB634",
                color: "#000",
              }}
              activeStyles={{
                bg: "#fff",
                color: "#000",
              }}
              hoverStyles={{
                bg: "green.300",
              }}
            />
          </TableCaption>
          <Thead>
            <Tr>
              {header.map((x) => (
                <Th key={x}>{x}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {posts &&
              posts.map((item) => {
                return (
                  <Tr key={uniqueID()}>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {formatInTimeZone(
                        item.pool.startTime,
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        "HH:mm aa, do MMM yyyy"
                      )}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      <CustomLink href={`/dashboard/poolview/${item.id}`}>
                        <Text cursor="pointer">{item.pool.poolName}</Text>
                      </CustomLink>
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {item.pool.totalPoolAmount}
                    </Td>

                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      <Tag
                        size="lg"
                        key="lg"
                        variant="solid"
                        bg={
                          // eslint-disable-next-line no-nested-ternary
                          item.status === "WON"
                            ? "#0EB634"
                            : item.status === "LOST"
                            ? "#ff0000"
                            : "#0EB634"
                        }
                        color={
                          // eslint-disable-next-line no-nested-ternary
                          item.status === "WON"
                            ? "#000"
                            : item.status === "LOST"
                            ? "#111"
                            : "#111111"
                        }
                      >
                        {item.status === "WON" || item.status === "LOST" ? (
                          item.status
                        ) : (
                          <Popover
                            returnFocusOnClose={false}
                            isOpen={isOpen}
                            onClose={onClose}
                            closeOnBlur={false}
                          >
                            <PopoverTrigger>
                              {popOverItems(item)}
                            </PopoverTrigger>
                            <PopoverContent
                              color="white"
                              bg="#1C1C26"
                              borderColor="blue.800"
                              borderRadius="2xl"
                            >
                              <PopoverHeader fontWeight="semibold">
                                Confirmation
                              </PopoverHeader>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverBody>
                                Are you sure you want to cancel ?
                              </PopoverBody>
                              <PopoverFooter
                                display="flex"
                                justifyContent="flex-end"
                              >
                                <ButtonGroup size="sm">
                                  <Button variant="outline" onClick={onToggle}>
                                    Cancel
                                  </Button>
                                  <Button
                                    bg="#0EB634"
                                    color="#111"
                                    onClick={cancelUserBet}
                                  >
                                    Apply
                                  </Button>
                                </ButtonGroup>
                              </PopoverFooter>
                            </PopoverContent>
                          </Popover>
                        )}
                      </Tag>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ProfileShowAll;
