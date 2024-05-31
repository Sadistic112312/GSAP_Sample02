import FallSVG from "./component/FallSVG";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function App() {
  // 註冊 ScrollTrigger 插件
  gsap.registerPlugin(ScrollTrigger);

    // timeline
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",// 觸發滾動的元素
        start: "top top", // 動畫開始的位置
        end: "bottom top", // 動畫結束的位置
        scrub: true, // 滾動時動畫會隨著滾動進度執行
      },
    });

//不同深度的層（layer）會以不同的速度移動，創造出一種視差效果
    gsap.utils.toArray(".layer").forEach((layer) => {
      let depth = layer.dataset.depth;  // 取得每個 layer 的深度資料

      let data = layer.getBoundingClientRect(); // 取得元素的矩形資料

      let move = data.y * depth; // 計算移動距離

      tl.to(layer, { y: -move, ease: "none" }, 0);
    });

    // 使風車旋轉
    gsap.to(".windmill-top", {
      rotation: "360deg", //旋轉 360 度
      transformOrigin: "50% 68%", //設定元素的旋轉中心點
      repeat: -1,  // 無限重複
      duration: 20, // 旋轉一圈所需時間
    });
 // 對FallSVG具有 "leaf" 類別的葉子元素應用動畫
    gsap.utils.toArray(".leaf").forEach((leaf, index) => {
      gsap.to(leaf, {
        x: -1000,
        y: 180,
        rotate: (index + 1) * 50,
        duration: 10,
      });
    });
 // 對FallSVG具有 "cloud" 類別的雲朵元素應用動畫
    gsap.utils.toArray(".cloud").forEach((cloud, index) => {
      gsap.to(cloud, {
        y: 10,
        x: 10,
        repeat: -1,
        duration: (index + 30) / (5 + index),
        yoyo: true,
        delay: 1 + index,
      });
    });
  });
  return (
    <>
      <div className="container h-screen w-screen bg-[#F3E0B5]">
        <FallSVG />
      </div>
      <div className="relative h-screen bg-white "></div>
    </>
  );
}
