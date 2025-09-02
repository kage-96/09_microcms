"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import classes from "../styles/Home.module.scss";
import { MicroCmsPost } from "./_types/MicroCmsPost";

export default function Home() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([])
  // const url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts'
  const url = 'https://fcmpu73mq2.microcms.io/api/v1/posts'

  useEffect(() => {
    const getDatas = async () => {
      try{
        const res = await fetch(url,{
          headers:{
            'X-MICROCMS-API-KEY' : process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string
          }
        });
        const {contents} = await res.json();
        setPosts(contents);
      }catch(err){
        console.log(err);
      }
    }
    getDatas();
  },[])
  
  if(posts.length === 0)return <p>投稿がありません。</p>

  return (
    <div className={classes.container}>
      <ul>
        {posts.map((post) => {
          const date = new Date(post.createdAt)
          return(
            <li key={post.id}>
              <Link href={`/posts/${post.id}/`}>
              <div className={classes.post}>
                <div className={classes.postInfo}>
                  <p className={classes.postDate}>{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>
                  <ul className={classes.postCategories}>
                    {post.categories.map((category) => (
                      <li key={category.id} className={classes.postCategory}>{category.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={classes.postTitle}>{post.title}</p>
                  <p className={classes.postBody} dangerouslySetInnerHTML={{__html:post.content}} />
                </div>
              </div>
              </Link>
            </li>
          )
        })}
      </ul>

    </div>
  );
}
