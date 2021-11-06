import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

interface FormAddImageData {
  image: string;
  title: string;
  description: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: true,
      validate: {

      }
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ title, description }: FormAddImageData) => {
      const { data } = await api.post('/images', {
        title,
        description,
        image: imageUrl,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: FormAddImageData): Promise<void> => {
    try {
      if (!data.image || !imageUrl) {
        toast({
          title: 'Image is required',
          description: 'Please select an image',
          status: 'error',
        });
        return;
      }
      await mutation.mutateAsync(data);

      toast({
        title: 'Image added',
        description: 'Image added successfully',
        status: 'success',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
      });
    } finally {
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          {...register('image', { validate: formValidations.image })}
          error={errors.image}
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="image"
        />

        <TextInput
          {...register('title', { validate: formValidations.title })}
          error={errors.title}
          placeholder="Título da imagem..."
        />

        <TextInput
          {...register('description', {
            validate: formValidations.description,
          })}
          error={errors.description}
          placeholder="Descrição da imagem..."
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
