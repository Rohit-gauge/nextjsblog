import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/BLogPost.module.css";
import * as fs from 'fs';

const Slug = (props) => {
  const [blog, setBlog] = useState(props.myBlog);


  return (
    <div>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>{blog && blog.title}</h1>
          <hr />
          <div>{blog && blog.content}</div>
        </main>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {params: { slug: 'how-to'}},
      {params: { slug: 'learn-js'}},
    ],
    fallback: true
  }
}


export async function getStaticProps(context) {

  const { slug } = context.params;

  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8' )


  return {
    props: { myBlog: JSON.parse(myBlog)},
  };
}
// export async function getServerSideProps(context) {

//   const { slug } = context.query;

//   let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   let myBlog = await data.json();


//   return {
//     props: { myBlog },
//   };
// }

export default Slug;
