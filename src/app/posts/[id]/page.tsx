"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';
import classes from "../../../styles/Detail.module.scss"
import { MicroCmsPost } from '@/app/_types/MicroCmsPost';

export default function Page(){
  const [ loading, setLoading ] = useState(false);
  const [ post , setPost ] = useState<MicroCmsPost | null>(null)
  const {id} = useParams();
  // const url = `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
  const url = `https://fcmpu73mq2.microcms.io/api/v1/posts/${id}`
  

  useEffect(() => {
    const getData = async () => {
      try{
        setLoading(true);
        const res = await fetch(url,{
          headers:{
            'X-MICROCMS-API-KEY':process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
          }
        });
        const data = await res.json();
        console.log(data)
        setPost(data);
      }catch(err){
        console.error(err);
      }finally{
        setLoading(false)
      }
    }
    getData()
  },[id])

  if (loading) {
    return <p>読み込み中...</p>
  }

  if (!post) {
    return <p>投稿は見つかりませんでした。</p>;
  }

  const { title, thumbnail, createdAt, categories, content } = post;
  const date = new Date(createdAt)
  return (
    <div className={classes.container}>
      <div className={classes.post}>
        <Image src={thumbnail.url} alt={title} height={400} width={800} />
        <div className={classes.postContent}>
          <div className={classes.postInfo}>
            <p className={classes.postDate}>{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>
            <ul className={classes.postCategories}>
              {categories.map(category => <li key={category.id} className={classes.postCategory}>{category.name}</li>)}
            </ul>
          </div>
          <div>
            <p className={classes.postTitle}>{title}</p>
            <p className={classes.postBody} dangerouslySetInnerHTML={{__html:content}} />
          </div>
        </div>
      </div>
    </div>
  )
}
