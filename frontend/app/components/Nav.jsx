import { Flex, Text, Spacer } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Nav() {
    return (
        <Flex bg="purple.500" color="white" justifyContent="center" alignItems="center" p={6} height="100px">
          <Text>Voting Dapp</Text>
          <Spacer />
          <ConnectButton />
        </Flex>
      );
}
