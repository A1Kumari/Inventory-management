import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import HeroImg from "../../../assets/heroImg.png";
import HeroImg1 from "../../../assets/heroImg1.png"; // Ensure correct image path


type DirectionalComponentProps = {
  direction: "left" | "right"; // Accepts 'left' or 'right' as direction
};

const DirectionalComponent: React.FC<DirectionalComponentProps> = ({ direction }) => {
  const isLeft = direction === "left"; // Determine if direction is 'left'

  return (
    <div
      className={`${styles["directional-component"]} ${
        isLeft ? styles.left : styles.right
      } ${styles["dots-pattern"]}`}
    >
      <div className={styles.content}>
        <h1 className={styles.head}>
          If you are a{" "}
          <span className={styles.orange}>small owner</span>, this is the{" "}
          <span className={styles.blue}>platform</span> made for{" "}
          <span className={styles.blue}>you!</span>
        </h1>
        <p className={styles.desp}>
          Manage your inventory, track sales, and grow your business with ease
          using <span className={styles.orange}>InviTree.</span>
        </p>

              <Image
              src={HeroImg} // Replace with the actual path
              alt="Main Hero Image"
              width={350}
              height={350}
            />

      </div>
    </div>
  );
};

export default DirectionalComponent;
