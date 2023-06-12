import React, { useEffect, useState } from "react";
import styles from "../styles/BLog.module.css";
import Link from "next/link";
import * as fs from 'fs';

const Blog = (props) => {
  // console.log(props);
  const [blogs, setBlogs] = useState(props.allBlogs);

  // useEffect(() => {

  // }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.h2}>Latest Blogs</h2>
        {blogs.map((blog) => (
          <div className={styles.blogItem} key={blog.title}>
            <Link href={`${blog.slug}`}>
              <h3 className={styles.h3}>{blog.title}</h3>
            </Link>
            <p>{blog.content.substr(0, 140)}...</p>
            <button className={styles.btn}>Read More</button>
          </div>
        ))}
      </main>
    </div>
  );
};

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata")
  let myFile;
  let allBlogs = [];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      console.log(item);
       myFile =  await fs.promises.readFile(('blogdata/' + item), 'utf-8' )
       console.log(myFile);
       allBlogs.push(JSON.parse(myFile))
    }
  return {
    props: { allBlogs },
  };
}
// export async function getServerSideProps(context) {
//   let data = await fetch("http://localhost:3000/api/blogs");
//   let allBlogs = await data.json();

//   return {
//     props: { allBlogs },
//   };
// }

export default Blog;
