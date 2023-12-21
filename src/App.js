import { useEffect, useState } from "react";
import "./App.css";
import img1 from "./images/IMG_20231221_201423_541.jpg";
import img2 from "./images/IMG_20231221_201509_287.jpg";
import img5 from "./images/IMG_20231221_201437_035.jpg";
import img4 from "./images/IMG_20231221_201455_091.jpg";
import img3 from "./images/IMG_10.jpg";
import img6 from "./images/IMG_20231221_201623_385.jpg";
import img7 from "./images/IMG_20231221_201704_349.jpg";
import img8 from "./images/IMG_20231221_201742_498_1.jpg";
import img9 from "./images/IMG_9.jpg";
import img10 from "./images/IMG_20231221_201418_096.jpg";

const arr = [
  {
    title: "Hi 👋",
    num: "01",
    src: img1,
  },
  {
    title: "I want to tell you Something 😍",
    num: "02",
    src: img2,
  },
  {
    title: "Please Keep Dragging 😊",
    num: "03",
    src: img3,
  },
  {
    title: "You are Amazing 🤩",
    num: "04",
    src: img4,
  },
  {
    title: "Most Beautiful Person on Earth 💯",
    num: "05",
    src: img5,
  },
  {
    title: "And Cutest 🎀",
    num: "06",
    src: img6,
  },
  {
    title: "And Since i met You 😗",
    num: "07",
    src: img7,
  },
  {
    title: "I feel very Lucky Everyday 😇",
    num: "08",
    src: img8,
  },
  {
    title: "and I have Crush on You 🥰",
    num: "09",
    src: img9,
  },
  {
    title: "I love You ❤️",
    num: "10",
    src: img10,
  },
];

function App() {
  /*--------------------
  Vars
  --------------------*/
  const [progress, setProgress] = useState(50);
  const [startX, setStartX] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);

  /*--------------------
  Contants
  --------------------*/
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  /*--------------------
  Get Z
  --------------------*/
  const getZindex = (array, index) =>
    array.map((_, i) =>
      index === i ? array.length : array.length - Math.abs(index - i)
    );

  /*--------------------
  Items
  --------------------*/
  const [items, setItems] = useState([]);
  const cursors = Array.from({ length: arr.length }, (_, i) => i);

  const displayItems = (index) => {
    const zIndex = getZindex(items, active)[index];
    items[index].style.setProperty("--zIndex", zIndex);
    items[index].style.setProperty("--active", (index - active) / items.length);
  };

  useEffect(() => {
    setItems(Array.from(document.querySelectorAll(".carousel-item")));
  }, []);

  /*--------------------
  Animate
  --------------------*/
  const animate = () => {
    const clampedProgress = Math.max(0, Math.min(progress, 100));
    const newActive = Math.floor((clampedProgress / 100) * (arr.length - 1));

    setActive(newActive);

    items.forEach((_, index) => displayItems(index));
  };

  useEffect(() => {
    animate();
  }, [progress, items, active]);

  /*--------------------
  Click on Items
  --------------------*/
  const handleItemClick = (i) => {
    setProgress((i / arr.length) * 100 + 10);
  };

  /*--------------------
  Handlers
  --------------------*/
  const handleWheel = (e) => {
    const wheelProgress = e.deltaY * speedWheel;
    setProgress((prevProgress) => prevProgress + wheelProgress);
  };

  const handleMouseMove = (e) => {
    if (e.type === "mousemove") {
      cursors.forEach((cursorIndex) => {
        const $cursor = document.querySelector(`.cursor${cursorIndex + 1}`);
        if ($cursor) {
          $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
      });
    }
    if (!isDown || !items) return; // Check if items is null
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX) * speedDrag;
    setProgress((prevProgress) => prevProgress + mouseProgress);
    setStartX(x);
  };

  const handleMouseDown = (e) => {
    setIsDown(true);
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setStartX(x);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  /*--------------------
  Listeners
  --------------------*/
  useEffect(() => {
    document.addEventListener("mousewheel", handleWheel);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousewheel", handleWheel);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchstart", handleMouseDown);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <>
      <div className="carousel">
        {arr?.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => handleItemClick(i)}
              className="carousel-item"
            >
              <div className="carousel-box">
                <div className="title">{item.title}</div>
                <div className="num">{item.num}</div>
                <img src={item.src} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="layout">
        <div className="box">
          I Love you so much 😍
          <br />
          ever forever infinity 🥰
          <br />
          love uhhhh ishu always 😘👉🏻👈🏻💗
        </div>
      </div>
      <a href="https://www.supah.it" target="_blank" className="logo">
        S
      </a>
      <div className="social">
        <a href="#" target="_blank">
          <svg>
            <use xlinkHref="#ico-linkedin" />
          </svg>
        </a>
        <a href="#" target="_blank">
          <svg>
            <use xlinkHref="#ico-instagram" />
          </svg>
        </a>
      </div>
      <svg style={{ display: "none" }}>
        <symbol id="ico-instagram" viewBox="0 0 35 35">
          <circle
            opacity=".2"
            cx="17.5"
            cy="17.5"
            r={17}
            stroke="var(--fill)"
            fill="none"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.944 20.476c.028-.457.042-1.282.042-2.476s-.014-2.019-.042-2.476c-.056-1.09-.378-1.93-.965-2.517s-1.422-.91-2.503-.965C21.018 12.014 20.194 12 19 12s-2.019.014-2.476.042c-1.081.047-1.92.368-2.517.965s-.918 1.436-.965 2.518C13.014 15.98 13 16.805 13 18c0 1.194.014 2.019.042 2.476.047 1.09.368 1.93.965 2.517s1.436.91 2.518.965c.466.028 1.29.042 2.475.042 1.184 0 2.01-.014 2.476-.042 1.072-.047 1.906-.368 2.503-.965.597-.597.918-1.436.965-2.517ZM19 13.075h-1.427c-.186 0-.438.01-.755.029a11.61 11.61 0 0 0-.797.07c-.215.028-.401.08-.56.154-.26.102-.489.251-.685.447-.196.196-.35.425-.461.685-.056.15-.103.336-.14.56a7.843 7.843 0 0 0-.084.811 7.113 7.113 0 0 0-.014.741c.01.178.01.453 0 .826-.01.373-.01.573 0 .601.01.028.01.228 0 .601s-.01.648 0 .826c.01.177.014.424.014.74 0 .318.028.588.084.812l.14.56c.112.26.265.489.461.685.196.196.425.345.685.447.15.056.336.108.56.154.224.047.49.07.797.07.308 0 .56.01.755.028.196.019.471.019.826 0 .354-.019.554-.019.601 0 .047.019.242.019.587 0s.62-.019.826 0c.205.019.456.01.755-.028.298-.037.569-.06.811-.07.242-.01.424-.06.546-.154.26-.102.494-.251.699-.447a1.75 1.75 0 0 0 .447-.686c.056-.149.103-.335.14-.559.038-.224.066-.494.084-.811.019-.317.023-.564.014-.741a11.82 11.82 0 0 1 0-.826c.01-.373.01-.573 0-.601-.01-.028-.01-.228 0-.601s.01-.648 0-.826c-.01-.177-.014-.424-.014-.74 0-.318-.028-.588-.084-.812l-.14-.56a1.956 1.956 0 0 0-1.147-1.133 3.979 3.979 0 0 0-.545-.153 3.915 3.915 0 0 0-.811-.07c-.326 0-.578-.01-.755-.028a5.916 5.916 0 0 0-.826 0c-.372.019-.568.019-.587 0Zm3.706 2.225c.14-.14.21-.308.21-.504a.57.57 0 0 0-.21-.503.767.767 0 0 0-.517-.21.718.718 0 0 0-.504.21.622.622 0 0 0-.21.503c.01.196.08.364.21.504s.299.21.504.21c.205 0 .377-.07.517-.21ZM22.063 18c0 .849-.298 1.576-.895 2.182a2.882 2.882 0 0 1-2.168.895 3.075 3.075 0 0 1-2.182-.895c-.606-.588-.904-1.315-.895-2.182.01-.867.308-1.594.895-2.182.588-.587 1.315-.886 2.182-.895.867-.01 1.59.29 2.168.895.578.606.876 1.333.895 2.182Zm-1.077 0a1.95 1.95 0 0 0-.573-1.413A1.897 1.897 0 0 0 19 16c-.56 0-1.03.196-1.413.587A2.001 2.001 0 0 0 17 18c-.01.55.186 1.021.587 1.413.401.391.872.587 1.413.587.54 0 1.012-.196 1.413-.587.4-.392.592-.863.573-1.413Z"
            transform="translate(-1.5 -0.5)"
            fill="var(--fill)"
          />
        </symbol>
        <symbol id="ico-linkedin" viewBox="0 0 35 35">
          <circle
            opacity=".2"
            cx="17.5"
            cy="17.5"
            r={17}
            stroke="var(--fill)"
            fill="none"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.3025 14.0835C15.3025 14.3845 15.1934 14.6403 14.9752 14.851C14.757 15.0617 14.4786 15.167 14.14 15.167C13.8014 15.167 13.5267 15.0617 13.316 14.851C13.1053 14.6403 13 14.3807 13 14.0722C13 13.7637 13.1053 13.5079 13.316 13.3047C13.5267 13.1016 13.8051 13 14.1512 13C14.4974 13 14.772 13.1016 14.9752 13.3047C15.1783 13.5079 15.2874 13.7675 15.3025 14.0835ZM13.0677 23V16.0248H15.2348V23H13.0677ZM16.4763 16.0248C16.5064 16.8676 16.5214 17.6125 16.5214 18.2596V23H18.7111V18.9819C18.7111 18.7111 18.7336 18.5305 18.7788 18.4402C18.9895 17.8984 19.3582 17.6275 19.8849 17.6275C20.6223 17.6275 20.991 18.1317 20.991 19.14V23H23.158V18.8691C23.158 17.8758 22.9285 17.1272 22.4695 16.623C22.0105 16.1189 21.4048 15.8668 20.6524 15.8668C19.6742 15.8668 18.9594 16.243 18.5079 16.9955H18.4628L18.3499 16.0248H16.4763Z"
            transform="translate(0 -1)"
            fill="var(--fill)"
          />
        </symbol>
      </svg>
      <div className="cursor" />
      <div className="cursor cursor2" />
    </>
  );
}

export default App;
