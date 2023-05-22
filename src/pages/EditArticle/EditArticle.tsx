import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { FormState } from '../../types/Form';
import { useFieldArray, useForm } from 'react-hook-form';
import { useAppSelector } from '../../store/storeHooks';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../components/UI/Form/Form';
import axios from 'axios';
import { Spin } from 'antd';
import { updateArticle } from '../../api/article/article';
import { ArticleTypes } from '../../types/ArticleTypes';

const EditArticle: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.user);
  const [article, setArticle] = useState<ArticleTypes | null>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const defaultValues = {
    title: article?.title || '',
    description: article?.description || '',
    body: article?.body || '',
    tagList: article?.tagList || '',
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({ defaultValues, mode: 'onBlur' });
  const { fields, append, remove } = useFieldArray<FormState['tagList'][0] | any>({ control, name: 'tagList' });
  useEffect(() => {
    axios
      .get(`https://blog.kata.academy/api/articles/${id}`)
      .then((response) => {
        setArticle(response.data.article);
        console.log(response);
        reset({
          title: response.data.article.title,
          description: response.data.article.description,
          body: response.data.article.body,
          tagList: response.data.article.tagList.map((tag: string) => ({
            name: tag,
          })),
        });
      })
      .finally(() => setLoading(false));
  }, [append, id, reset]);

  const handleClick = async (data: any) => {
    await updateArticle(id, data, token);
    navigate('/');
  };
  const errorTitle = errors.title ? errors.title.message : undefined;
  const errorDesc = errors.description ? errors.description.message : undefined;
  const errorText = errors.body ? errors.body.message : undefined;

  if (loading) {
    return <Spin />;
  }
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

export default EditArticle;
