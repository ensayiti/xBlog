import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div
      className="border border-slate-300 p-4 rounded-md shadow-sm bg-slate-800">
      <p className="text-sm text-slate-400">{props.date}</p>

      <Link href={`/posts/${props.slug}`}>
        <h2 className=" text-slate-200 font-bold mb-3">{props.title}</h2>
      </Link>
      <p className="text-slate-300">{props.subtitle}</p>
      <Link href={`/posts/${props.slug}`}>
        <button className="btn btn-primary btn-wide btn-sm normal-case mt-3 rounded-lg justify-center items-center flex">Read</button>
      </Link>
    </div>
  );
};

export default PostPreview;