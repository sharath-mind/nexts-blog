import classes from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/dp.png"
          alt="Image"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&#39;m Sharath</h1>
      <p>This blog site is built on NextJs.</p>
    </section>
  );
};

export default Hero;
