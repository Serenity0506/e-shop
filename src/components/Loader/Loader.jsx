import LoaderStyles from "./Loader.module.css"
import spinner1 from "./spinner-1.gif"
import spinner2 from "./spinner-2.gif"

const images = {
  1: spinner1,
  2: spinner2
}

export const Loader = () => {
  const imgNumber = (Math.random() * 2 | 0) + 1

  return (
    <div className={LoaderStyles.box}>
      <img src={images[imgNumber]} alt="spinner" className={LoaderStyles.spinner}/>
    </div>
  )
}
