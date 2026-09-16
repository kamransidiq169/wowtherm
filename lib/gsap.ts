import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("wowtherm", "M0,0 C0.22,0.61 0.36,1 1,1");
}

export { gsap, ScrollTrigger, CustomEase };
