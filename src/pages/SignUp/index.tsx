import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { Map } from '../../components/Map';

export default function SignUp() {
  return (
    <Stack
      minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      bgColor='primary.dark'
      className='bg-1'
    >
      <Flex flex={1} align={'center'} justify={'center'}>
        <Map />
      </Flex>
    </Stack>
  );
}
