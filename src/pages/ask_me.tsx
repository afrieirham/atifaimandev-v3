import Default from '@/components/layout/Default';
import { useLottie } from 'lottie-react';
import {
  NextPage,
  GetStaticProps,
} from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {}
  };
};

const AskMe: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const style = {
    height: 300,
  };

  const options = {
    animationData: require("../animation/ask-me-anything.json"),
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const question = inputRef.current?.value;
    if (question) {
      try {
        await axios.post('/api/questions', {
          question,
        });
        
        toast("Your question has been successfully posted!", {
          position: 'top-center',
          type: 'success',
        });
        inputRef.current!.value = '';
      }
      catch(error) {
        toast("Something went wrong, please try again later", {
          position: 'top-center',
          type: 'error',
        });
      }
      setLoading(false);
    }
  }

  return (
    <Default title="The Home of atifaiman.dev">
      {View}
      <section>
        <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center">AMA Corner</h1>
          <div className="flex flex-col rounded-3xl w-full overflow-hidden shadow-md">
            <div className="p-4 flex flex-row gap-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <Image
                src="https://avatars.githubusercontent.com/u/41750858"
                className="object-cover rounded-full"
                alt="Atif"
                width={50}
                height={50}
              />
              <div className="flex flex-col">
                <p>@alserembani</p>
                <p className='font-bold'>
                  Ask me Web Dev and Career
                </p>
              </div>
            </div>
            <textarea ref={inputRef} rows={4} id="ask-me-anything" className="px-4 py-3 rounded w-full outline-none font-bold" placeholder="Write your question here" maxLength={300} />
          </div>

          {/* Duplicate the bottom button, but change the gradient to my blue shade */}
          <button type="submit" className="w-full px-12 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold">
          {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <CgSpinner className="animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Ask Atif!"
          )}
          </button>
          <p className="p-4 bg-slate-200 rounded">
            This Q&A is totally anonymous. I didn&apos;t collect any data whatsoever other than the question itself. You can head to the codebase and&nbsp; 
            <a
              href="https://github.com/alserembani94/atifaimandev-v3/blob/main/src/pages/ask_me.tsx"
              className="text-blue-500 hover:text-blue-800 underline inline-flex items-center"
              rel="noopener noreferrer"
              target="_blank"
            >
              check it out
              <MdOpenInNew />
            </a>
            . The answer will be published on my 𝕏 (previously Twitter).
          </p>
        </form>
      </section>
      <ToastContainer />
    </Default>
  );
};

export default AskMe;
