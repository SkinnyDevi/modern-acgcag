import React from 'react';

import BananaPng from '@assets/icons/banana-icon.png';

export interface ACGIconsProps {
  iconName:
    | 'search'
    | 'downloaded'
    | 'shader'
    | 'import'
    | 'file-edit'
    | 'banana'
    | 'play'
    | 'mod'
    | 'check';
  iconSize: [number, number];
}

interface IconSize {
  width: number;
  height: number;
}

export default function ACGIcons({iconName, iconSize}: ACGIconsProps) {
  const [w, h] = iconSize;

  switch (iconName) {
    case 'search':
      return (
        <SearchIcon
          width={w}
          height={h}
        />
      );

    case 'downloaded':
      return (
        <DownloadedIcon
          width={w}
          height={h}
        />
      );

    case 'shader':
      return (
        <ShaderIcon
          width={w}
          height={h}
        />
      );

    case 'import':
      return (
        <ImportIcon
          width={w}
          height={h}
        />
      );

    case 'file-edit':
      return (
        <FileEditIcon
          width={w}
          height={h}
        />
      );

    case 'play':
      return (
        <PlayIcon
          width={w}
          height={h}
        />
      );

    case 'banana':
      return (
        <BananaIcon
          width={w}
          height={h}
        />
      );
    case 'mod':
      return (
        <ModIcon
          width={w}
          height={h}
        />
      );
    case 'check':
      return (
        <CheckIcon
          width={w}
          height={h}
        />
      );
  }
}

function SearchIcon({width, height}: IconSize) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      style={{width: `${width}px`, height: `${height}px`}}
    >
      <g clipPath="url(#clip0_3_97)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.03162 10.949C8.03162 8.03163 9.17398 5.27241 11.2478 3.21617C13.3216 1.14235 16.0633 0 18.9807 0C21.9156 0 24.6573 1.14235 26.7311 3.21617C28.8049 5.27241 29.9297 8.03163 29.9297 10.949C29.9297 13.8664 28.8049 16.6257 26.7311 18.6995C24.6573 20.7557 21.9156 21.8981 18.9807 21.8981C16.0633 21.8981 13.3216 20.7557 11.2478 18.6995C9.17398 16.6257 8.03162 13.8664 8.03162 10.949ZM10.4921 10.949C10.4921 8.6819 11.3708 6.53779 12.9701 4.93849C14.587 3.33919 16.7135 2.44288 18.9807 2.44288C21.2654 2.44288 23.3919 3.33919 25.0088 4.93849C26.6081 6.53779 27.4868 8.6819 27.4868 10.949C27.4868 13.2162 26.6081 15.3603 25.0088 16.9596C21.6872 20.2812 16.2917 20.2812 12.9701 16.9596C11.3708 15.3603 10.4921 13.2162 10.4921 10.949Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.9947 21.0545C6.9947 20.9139 7.04743 20.7733 7.15288 20.6678L9.50789 18.3128C9.82423 18.7171 10.1406 19.0861 10.5096 19.4376C10.8963 19.8418 11.3181 20.1933 11.7574 20.5272L9.38486 22.8998C9.17397 23.1107 8.84005 23.1107 8.62915 22.8998C8.54128 22.7944 8.48855 22.6714 8.48855 22.5308C8.48855 22.4077 8.5237 22.3023 8.594 22.2144L7.75042 21.529C7.55709 21.6169 7.32862 21.5817 7.15288 21.4236C7.04743 21.3181 6.9947 21.1775 6.9947 21.0545Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.0702731 27.7153C0.0702731 27.1178 0.298744 26.5378 0.738112 26.116L5.6766 21.1599C6.09839 20.7381 6.67836 20.5097 7.2759 20.5097C7.89101 20.5097 8.47098 20.7381 8.89277 21.1599C9.31456 21.5993 9.56061 22.1617 9.56061 22.7768C9.56061 23.3919 9.31456 23.9543 8.89277 24.3937L3.95428 29.3322C3.05797 30.2109 1.61685 30.2109 0.738112 29.3322C0.298744 28.8928 0.0702731 28.3304 0.0702731 27.7153Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.4306 7.39895C17.3989 5.43058 20.58 5.43058 22.5483 7.39895C22.7592 7.59227 23.0931 7.59227 23.2865 7.39895C23.4974 7.18805 23.4974 6.85413 23.2865 6.64324C20.9139 4.27065 17.065 4.27065 14.6924 6.64324C14.587 6.74869 14.5343 6.88928 14.5343 7.01231C14.5343 7.1529 14.587 7.2935 14.6924 7.39895C14.8858 7.59227 15.2197 7.59227 15.4306 7.39895Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_3_97">
          <rect
            width="30"
            height="30"
            fill="white"
            transform="matrix(0 1 -1 0 30 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function DownloadedIcon({width, height}: IconSize) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="26"
      viewBox="0 0 30 26"
      fill="none"
      style={{width: `${width}px`, height: `${height}px`}}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.67776 0.588102C6.8261 0.332903 8.19374 0.25 9.77534 0.25H12.067C13.488 0.25 14.815 0.960175 15.6032 2.14252L16.7543 3.86916C17.0171 4.26325 17.4593 4.5 17.9331 4.5H25.0949C27.358 4.5 29.1923 6.28663 29.1708 8.58737C29.145 11.3272 29.1667 14.068 29.1667 16.808C29.1667 18.3896 29.0838 19.7572 28.8285 20.9056C28.5698 22.0701 28.1154 23.0939 27.313 23.8963C26.5106 24.6987 25.4867 25.1532 24.3222 25.4118C23.1739 25.6671 21.8062 25.75 20.2247 25.75H9.77534C8.19374 25.75 6.8261 25.6671 5.67776 25.4118C4.51333 25.1532 3.48942 24.6987 2.68702 23.8963C1.88464 23.0939 1.43023 22.0701 1.17145 20.9056C0.916247 19.7572 0.833344 18.3896 0.833344 16.808V9.192C0.833344 7.61039 0.916247 6.24275 1.17145 5.09442C1.43023 3.92999 1.88464 2.90608 2.68702 2.10368C3.48942 1.30129 4.51333 0.846884 5.67776 0.588102ZM16.4167 11.5833C16.4167 10.8009 15.7824 10.1667 15 10.1667C14.2176 10.1667 13.5833 10.8009 13.5833 11.5833V15.9549L12.4601 14.8316C11.9068 14.2784 11.0099 14.2784 10.4566 14.8316C9.90337 15.3848 9.90337 16.2818 10.4566 16.8351L13.9097 20.2882C13.9249 20.3033 13.9403 20.3182 13.9561 20.3327C14.215 20.6147 14.5868 20.7917 15 20.7917C15.4133 20.7917 15.785 20.6147 16.044 20.3327C16.0597 20.3182 16.0751 20.3033 16.0903 20.2882L19.5434 16.8351C20.0966 16.2818 20.0966 15.3848 19.5434 14.8316C18.9902 14.2784 18.0932 14.2784 17.54 14.8316L16.4167 15.9549V11.5833Z"
      />
    </svg>
  );
}

function ShaderIcon({width, height}: IconSize) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      style={{width: `${width}px`, height: `${height}px`}}
    >
      <path d="M17 2.125C14.058 2.125 11.1821 2.9974 8.7359 4.63189C6.28972 6.26638 4.38315 8.58953 3.2573 11.3076C2.13145 14.0256 1.83687 17.0165 2.41083 19.902C2.98478 22.7874 4.40149 25.4379 6.48179 27.5182C8.5621 29.5985 11.2126 31.0152 14.098 31.5892C16.9835 32.1631 19.9744 31.8686 22.6924 30.7427C25.4105 29.6169 27.7336 27.7103 29.3681 25.2641C31.0026 22.8179 31.875 19.942 31.875 17C31.875 13.0549 30.3078 9.27139 27.5182 6.48179C24.7286 3.69218 20.9451 2.125 17 2.125ZM29.75 17C29.744 17.6872 29.6836 18.3729 29.5694 19.0506L22.3125 11.7406L26.0631 7.99C27.2416 9.17439 28.1741 10.5803 28.8069 12.1266C29.4396 13.673 29.7602 15.3292 29.75 17ZM17.7544 16.2456L20.7613 13.2388L28.9425 21.4306C28.4307 22.8133 27.6829 24.0967 26.7325 25.2237L17.7544 16.2456ZM25.1919 26.7325C24.0648 27.6829 22.7814 28.4307 21.3988 28.9425L13.2069 20.7613L16.2138 17.7544L25.1919 26.7325ZM7.99001 26.01L11.7406 22.3125L19.0506 29.6225C18.3715 29.7189 17.6858 29.7616 17 29.75C15.3255 29.7532 13.667 29.4243 12.1205 28.7823C10.5739 28.1403 9.17002 27.1981 7.99001 26.01Z" />
    </svg>
  );
}

function ImportIcon({width, height}: IconSize) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      style={{width: `${width}px`, height: `${height}px`}}
    >
      <path d="M11.1562 1.59375V13.8125H14.875V11.6875C14.875 11.587 14.9036 11.4885 14.9573 11.4035C15.0111 11.3186 15.0879 11.2506 15.1787 11.2075C15.2696 11.1645 15.3708 11.1481 15.4706 11.1602C15.5704 11.1724 15.6647 11.2127 15.7425 11.2763L21.5863 16.0576C21.6472 16.1074 21.6963 16.1701 21.73 16.2412C21.7637 16.3123 21.7812 16.3901 21.7812 16.4688C21.7812 16.5474 21.7637 16.6252 21.73 16.6963C21.6963 16.7674 21.6472 16.8301 21.5863 16.8799L15.7425 21.6612C15.6647 21.7248 15.5704 21.7651 15.4706 21.7773C15.3708 21.7894 15.2696 21.773 15.1787 21.73C15.0879 21.6869 15.0111 21.6189 14.9573 21.534C14.9036 21.449 14.875 21.3505 14.875 21.25V19.125H11.1562V26.0312H14.875C15.0159 26.0312 15.151 26.0872 15.2507 26.1868C15.3503 26.2865 15.4062 26.4216 15.4062 26.5625V30.2812H32.4062V1.59375H11.1562ZM14.3438 3.71875H13.2812V4.78125H12.2188V3.1875C12.2188 3.0466 12.2747 2.91148 12.3743 2.81185C12.474 2.71222 12.6091 2.65625 12.75 2.65625H14.3438V3.71875ZM31.3438 28.6875C31.3438 28.8284 31.2878 28.9635 31.1882 29.0632C31.0885 29.1628 30.9534 29.2188 30.8125 29.2188H29.2188V28.1562H30.2812V27.0938H31.3438V28.6875ZM31.3438 6.90625H30.2812V5.84375H31.3438V6.90625ZM31.3438 4.78125H30.2812V3.71875H29.2188V2.65625H30.8125C30.9534 2.65625 31.0885 2.71222 31.1882 2.81185C31.2878 2.91148 31.3438 3.0466 31.3438 3.1875V4.78125Z" />
      <path d="M11.9074 27.0938L14.3438 29.5301V27.0938H11.9074Z" />
      <path d="M14.4994 31.1881L10.2494 26.9381C10.1498 26.8385 10.0938 26.7034 10.0938 26.5625V19.125H9.03125V32.4062H30.2812V31.3438H14.875C14.7341 31.3437 14.599 31.2877 14.4994 31.1881Z" />
      <path d="M15.9375 18.5938V20.1291L20.4112 16.4688L15.9375 12.8084V14.3438C15.9375 14.4846 15.8815 14.6198 15.7819 14.7194C15.6823 14.819 15.5471 14.875 15.4062 14.875H5.84375V18.0625H15.4062C15.5471 18.0625 15.6823 18.1185 15.7819 18.2181C15.8815 18.3177 15.9375 18.4529 15.9375 18.5938Z" />
      <path d="M9.03125 3.71875H10.0938V13.8125H9.03125V3.71875Z" />
      <path d="M3.1875 14.875H4.25V18.0625H3.1875V14.875Z" />
      <path d="M1.0625 14.875H2.125V18.0625H1.0625V14.875Z" />
    </svg>
  );
}

function FileEditIcon({width, height}: IconSize) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      style={{width: `${width}px`, height: `${height}px`}}
    >
      <path d="M32.3 24.9333H26.6333V10.7667L29.4667 7.36667L32.3 10.7667V24.9333Z" />
      <path d="M30.6 31.1667H28.3333C27.3949 31.1667 26.6333 30.4056 26.6333 29.4667V27.2H32.3V29.4667C32.3 30.4056 31.5384 31.1667 30.6 31.1667Z" />
      <path d="M23.456 10.2H17.5667C17.2533 10.2 17 9.9467 17 9.63333V3.7434C17 3.53657 17.1683 3.4 17.3457 3.4C17.4301 3.4 17.5168 3.43117 17.5865 3.50087L23.6991 9.6135C23.77 9.6849 23.8 9.77273 23.8 9.85887C23.8 10.034 23.6617 10.2 23.456 10.2Z" />
      <path d="M17.5667 11.9C16.3149 11.9 15.3 10.8851 15.3 9.63333V3.4H3.4C2.7744 3.4 2.26666 3.90773 2.26666 4.53333V30.0333C2.26666 30.6589 2.7744 31.1667 3.4 31.1667H22.6667C23.2923 31.1667 23.8 30.6589 23.8 30.0333V11.9H17.5667ZM6.23333 19.2667H15.3V21.5333H6.23333V19.2667ZM19.8333 26.0667H6.23333V23.8H19.8333V26.0667ZM19.8333 17H6.23333V14.7333H19.8333V17Z" />
    </svg>
  );
}

function PlayIcon({width, height}: IconSize) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      style={{width: `${width}px`, height: `${height}px`}}
    >
      <path d="M30.3134 14.0864L6.96851 0.393246C6.94781 0.380825 6.92711 0.369435 6.90538 0.359076C4.6879 -0.697634 2.01814 0.905678 2.01813 3.38049V30.6194C2.01813 33.1404 4.76148 34.7147 6.96851 33.6067C6.96851 33.6067 30.2709 19.9385 30.3134 19.9136C32.4986 18.6318 32.4943 15.3642 30.3134 14.0864Z" />
    </svg>
  );
}

function BananaIcon({width, height}: IconSize) {
  return (
    <img
      src={BananaPng}
      width={width}
      height={height}
    />
  );
}

function ModIcon({width, height}: IconSize) {
  return (
    <svg
      id="fi_4783238"
      height="512"
      viewBox="0 0 512 512"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
      style={{width: `${width}px`, height: `${height}px`}}
    >
      <path
        id="cube"
        d="m331.5 192-75.5-41.2-75.5 41.2 75.5 41.2z"
      ></path>
      <path
        id="cube-2"
        d="m180.5 64 75.5 41.2 75.5-41.2-75.5-41.2z"
        data-name="cube"
      ></path>
      <path
        id="cube-3"
        d="m338 202.2-76 41.4v98.3l76-41.4z"
        data-name="cube"
      ></path>
      <path
        id="cube-4"
        d="m262 140.5 20 10.9v-23.4a6.14 6.14 0 0 1 3.1-5.3l52.9-28.8v-19.7l-76 41.4z"
        data-name="cube"
      ></path>
      <path
        id="cube-5"
        d="m218 138.2-76 41.4v98.4l20-10.9v-75a6.14 6.14 0 0 1 3.1-5.3l52.9-28.8z"
        data-name="cube"
      ></path>
      <path
        id="cube-6"
        d="m300.5 128 75.5 41.2 75.5-41.2-75.5-41.2z"
        data-name="cube"
      ></path>
      <path
        id="cube-7"
        d="m370 421.9v-98.3l-24.7-13.5-18.1 9.9 19.7 10.7a6.14 6.14 0 0 1 3.1 5.3v75z"
        data-name="cube"
      ></path>
      <path
        id="cube-8"
        d="m370 277.8v-98.3l-76-41.4v19.8l52.9 28.8a6.14 6.14 0 0 1 3.1 5.3v75z"
        data-name="cube"
      ></path>
      <path
        id="cube-9"
        d="m431.8 250.7 26.2-14.2v-98.3l-76 41.4v98.3z"
        data-name="cube"
      ></path>
      <path
        id="cube-10"
        d="m250 243.5-76-41.4v98.2l76 41.5z"
        data-name="cube"
      ></path>
      <path
        id="cube-11"
        d="m162 336a6.14 6.14 0 0 1 3.1-5.3l19.7-10.7-18.1-9.9-24.7 13.5v98.3l20-10.9z"
        data-name="cube"
      ></path>
      <path
        id="cube-12"
        d="m174 93.9 52.9 28.8a6.14 6.14 0 0 1 3.1 5.3v23.3l20-10.9v-24.9l-76-41.4z"
        data-name="cube"
      ></path>
      <path
        id="cube-13"
        d="m338 346.1-76 41.5v98.3l76-41.5z"
        data-name="cube"
      ></path>
      <path
        id="cube-14"
        d="m451.5 272-16.9-9.2-55.8 30.4a5.79 5.79 0 0 1 -5.7 0l-23.1-12.6v18.4l26 14.2z"
        data-name="cube"
      ></path>
      <path
        id="cube-15"
        d="m250 387.6-76-41.5v98.3l76 41.5z"
        data-name="cube"
      ></path>
      <path
        id="cube-16"
        d="m458 282.1-76 41.5v98.3l76-41.5z"
        data-name="cube"
      ></path>
      <path
        id="cube-17"
        d="m331.4 336-16.8-9.2-55.8 30.4a5.79 5.79 0 0 1 -5.7 0l-55.8-30.4-16.8 9.2 75.5 41.2z"
        data-name="cube"
      ></path>
      <path
        id="cube-18"
        d="m60.5 128 75.5 41.2 75.5-41.2-75.5-41.2z"
        data-name="cube"
      ></path>
      <path
        id="cube-19"
        d="m161.9 299v-18.4l-23.1 12.6a5.79 5.79 0 0 1 -5.7 0l-55.8-30.4-16.8 9.2 75.4 41.2z"
        data-name="cube"
      ></path>
      <path
        id="cube-20"
        d="m54 236.4 26.2 14.2 49.8 27.2v-98.3l-76-41.4z"
        data-name="cube"
      ></path>
      <path
        id="cube-21"
        d="m130 323.6-76-41.5v98.3l76 41.5z"
        data-name="cube"
      ></path>
    </svg>
  );
}

function CheckIcon({width, height}: IconSize) {
  return (
    <svg
      version="1.1"
      id="fi_87932"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 191.667 191.667"
      style={{width: `${width}px`, height: `${height}px`}}
    >
      <path
        d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z
     M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685
    c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971
    l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969
    C156.146,65.765,156.146,74.362,150.862,79.646z"
      ></path>
    </svg>
  );
}
