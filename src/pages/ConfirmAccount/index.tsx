import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useLoading } from '@/hooks/useLoading';

import { Button, Center, Flex, Heading, Image, Stack, useToast, VStack } from '@chakra-ui/react';
import { Input } from '@/components';
import { useEffect, useState } from 'react';
import logo from '@/assets/images/logo-acai.svg';
import { AxiosError } from 'axios';
import api from '@/services';

interface SignUpFormData {
  pinCode: string;
  status: boolean;
}

export default function SignUp() {
  const signInFormSchema = yup.object().shape({
    pinCode: yup.string().required('Este campo é obrigatório'),
  });

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const imageUrls = [
      'https://res.cloudinary.com/dxin0mfj4/image/upload/v1682431925/Acai%20Sunset/DSCF3050_z4ymvm.jpg',
      'https://res.cloudinary.com/dxin0mfj4/image/upload/v1682432059/Acai%20Sunset/DSCF3062_msdtel.jpg',
      'https://res.cloudinary.com/dxin0mfj4/image/upload/v1682425781/Acai%20Sunset/DSCF3402_wpwqlq.jpg',
    ];

    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];
    setImageUrl(randomImageUrl);
  }, []);

  const { loading, setLoading } = useLoading();
  const toast = useToast();
  const { handleSubmit, formState, control } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignUp = async (values: SignUpFormData) => {
    try {
      setLoading(true);
      values.status = true;
      await api.patch(`/users/${values.pinCode}`, values);
      toast({
        title: 'Sucesso',
        description: 'Conta confirmada!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
    } catch (err) {
      const error = err as AxiosError;
      toast({
        title: 'Erro ao realizar cadastro!',
        description: error?.response?.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
    }
  };

  return (
    <Stack
      minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      bgColor='primary.dark'
      className='bg-1'
    >
      <Flex flex={1} align={'center'} justify={'center'}>
        <Stack
          as='form'
          // @ts-ignore
          onSubmit={handleSubmit(handleSignUp)}
          bgColor='white'
          p={8}
          borderRadius={5}
        >
          <VStack>
            <Image src={logo} width={150} />
            <Heading fontSize={'2xl'}>Bem vindo ao ClubSunset</Heading>
          </VStack>
          <Center>
            <Input
              name='pinCode'
              type='text'
              pinInput
              control={control}
              errors={errors.pinCode && errors.pinCode.message}
              label={'Digite o código recebido'}
            />
          </Center>
          <Stack spacing={6}>
            <Button
              type='submit'
              isLoading={loading}
              bgColor='primary.darkest'
              _hover={{ bgColor: 'primary.dark' }}
              color='white'
              variant={'solid'}
            >
              Confirmar Conta
            </Button>

            <VStack>
              <Heading fontSize={'sm'}> ClubSunset &copy; Montreal Tecnologia</Heading>
              <Heading fontSize={'sm'}>v1.0.0</Heading>
            </VStack>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} display={{ base: 'none', sm: 'none', md: 'flex' }}>
        <Image alt={'Login Image'} objectFit={'cover'} src={imageUrl} />
      </Flex>
    </Stack>
  );
}
