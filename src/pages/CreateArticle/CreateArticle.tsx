import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormState } from '../../types/Form';
import { useFieldArray, useForm } from 'react-hook-form';
import Form from '../../components/UI/Form/Form';
import { createArticle } from '../../api/article/article';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Cookies from 'js-cookie';

type Default = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

const token = Cookies.get('token');

const CreateArticle: React.FC = () => {
  const navigate = useNavigate();

  const defaultValues: Default = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Default>({ defaultValues, mode: 'onBlur' });

  const { fields, append, remove } = useFieldArray<FormState['tagList'][0] | any>({ control, name: 'tagList' });

  const handleClick = async (data: Default) => {
    await createArticle(data as any, token);
    navigate('/');
  };
  const errorTitle = errors.title ? errors.title.message : undefined;
  const errorDesc = errors.description ? errors.description.message : undefined;
  const errorText = errors.body ? errors.body.message : undefined;
  return (
    <Form
      onSubmit={handleSubmit(handleClick)}
      title={'Create new article'}
      buttonText={'Send'}
      error={''}
      typeButton={'articleForm'}
    >
      <Input
        name={'articleInput'}
        register={register('title', { required: 'Укажите заголовок' })}
        type="text"
        placeholder="Title"
        label="Title"
        error={errorTitle}
      />
      <Input
        name={'articleInput'}
        register={register('description', { required: 'Укажите описание' })}
        type="text"
        placeholder="Description"
        label="Description"
        error={errorDesc}
      />
      <Input
        name={'Text'}
        register={register('body', { required: 'Укажите пост' })}
        type="textarea"
        placeholder="Text"
        label="Text"
        error={errorText}
      />
      <p>Tags</p>
      {fields && fields.length > 0 ? (
        fields.map((field, ind) => (
          <div key={field.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Input
              name={'tags'}
              register={register(`tagList.${ind}.name` as any, {
                required: 'Укажите тег',
              })}
              placeholder="Tag"
              error={errors.tagList?.[ind] ? 'Укажите тэг' : undefined}
            />
            <Button typeButton={'deleteTag'} children={'Delete tag'} linkType={'simple'} onSubmit={() => remove(ind)} />
            {ind === fields.length - 1 && (
              <Button
                typeButton={'addTag'}
                children={'Add tag'}
                linkType={'simple'}
                onSubmit={() => append({ name: '' })}
              />
            )}
          </div>
        ))
      ) : (
        <Button typeButton={'addTag'} children={'Add tag'} linkType={'simple'} onSubmit={() => append({ name: '' })} />
      )}
    </Form>
  );
};

export default CreateArticle;
