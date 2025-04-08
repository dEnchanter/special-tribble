/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Skeleton } from '../ui/skeleton'
import ContentLoader from 'react-content-loader'

export const Loader = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        {/* <Skeleton className="min-h-[50vh] min-w-[65rem]" /> */}
        <Skeleton className="h-[10rem] min-w-[65rem]" />
        <Skeleton className="h-[5rem] min-w-[65rem]" />
        <Skeleton className="h-[5rem] min-w-[65rem]" />
      </div>
    </div>
  )
}

export const DataTableLoader2 = (props: any) => (
  <ContentLoader
    width={1000}
    height={550}
    viewBox="0 0 1000 550"
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
    <circle cx="879" cy="123" r="11" />
    <circle cx="914" cy="123" r="11" />
    <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
    <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
    <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
    <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
    <circle cx="880" cy="184" r="11" />
    <circle cx="915" cy="184" r="11" />
    <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
    <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
    <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
    <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
    <circle cx="881" cy="242" r="11" />
    <circle cx="916" cy="242" r="11" />
    <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
    <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
    <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
    <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
    <circle cx="882" cy="303" r="11" />
    <circle cx="917" cy="303" r="11" />
    <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
    <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
    <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
    <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
    <circle cx="881" cy="363" r="11" />
    <circle cx="916" cy="363" r="11" />
    <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
    <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
    <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
    <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
    <circle cx="882" cy="424" r="11" />
    <circle cx="917" cy="424" r="11" />
    <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
    <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
    <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
    <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
    <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
    <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
    <circle cx="882" cy="484" r="11" />
    <circle cx="917" cy="484" r="11" />
    <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
    <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
    <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
    <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
    <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
    <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
    <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
    <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
    <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
    <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
  </ContentLoader>
)

export const NewFacebookLoader = (props: any) => {
  return (
    <ContentLoader viewBox="0 0 600 160" height={160} width={600} {...props}>
      <rect x="-16" y="33" rx="4" ry="4" width="129" height="6" />
      <rect x="0" y="48" rx="3" ry="3" width="113" height="6" />
      <rect x="24" y="79" rx="3" ry="3" width="424" height="7" />
      <rect x="24" y="99" rx="3" ry="3" width="422" height="7" />
      <rect x="24" y="120" rx="3" ry="3" width="424" height="7" />
      <circle cx="528" cy="48" r="30" />
    </ContentLoader>
  )
}

export const Medium = (props: any) => (
  <ContentLoader viewBox="0 0 660 475" height={475} width={660} {...props}>
    <circle cx="25" cy="112" r="15" />
    <rect x="10" y="18" rx="0" ry="0" width="464" height="9" />
    <rect x="497" y="10" rx="0" ry="0" width="144" height="144" />
    <rect x="10" y="41" rx="0" ry="0" width="464" height="9" />
    <rect x="10" y="65" rx="0" ry="0" width="364" height="9" />
    <rect x="50" y="98" rx="0" ry="0" width="115" height="9" />
    <rect x="50" y="115" rx="0" ry="0" width="115" height="10" />
  </ContentLoader>
)

export const NestedList = (props: any) => (
  <ContentLoader viewBox="0 0 400 130" height={130} width={400} {...props}>
    <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
    <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
    <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
    <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
    <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
    <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
  </ContentLoader>
)

export const DoorDashFavorite = (props: any) => (
  <ContentLoader
    width={450}
    height={400}
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
    <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
    <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
)

export const DevtoCard = (props: any) => (
  <ContentLoader viewBox="0 0 400 475" height={475} width={400} {...props}>
    <circle cx="30" cy="258" r="30" />
    <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
    <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
    <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
    <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
  </ContentLoader>
)

export const CleanChat = (props: any) => {
  return (
    <ContentLoader viewBox="0 0 400 160" height={160} width={400} {...props}>
      <rect x="0" y="12" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="29" rx="5" ry="5" width="220" height="10" />
      <rect x="179" y="76" rx="5" ry="5" width="220" height="10" />
      <rect x="179" y="58" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="104" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="122" rx="5" ry="5" width="220" height="10" />
    </ContentLoader>
  )
}

export const ChatLoader = (props: any) => {
  return (
    <ContentLoader viewBox="0 0 446 160" height={160} width={446} {...props}>
      <circle cx="19" cy="25" r="16" />
      <rect x="39" y="12" rx="5" ry="5" width="220" height="10" />
      <rect x="40" y="29" rx="5" ry="5" width="220" height="10" />
      <circle cx="420" cy="71" r="16" />
      <rect x="179" y="76" rx="5" ry="5" width="220" height="10" />
      <rect x="179" y="58" rx="5" ry="5" width="220" height="10" />
      <circle cx="21" cy="117" r="16" />
      <rect x="45" y="104" rx="5" ry="5" width="220" height="10" />
      <rect x="45" y="122" rx="5" ry="5" width="220" height="10" />
    </ContentLoader>
  )
}

export const CalloutStripLoader = (props: any) => {
  return (
    <ContentLoader viewBox="0 0 400 31" height={31} width={400} {...props}>
      <rect height="5.5" rx="1" ry="1" width="340" x="31" y="5" />
      <rect height="5.5" rx="1" ry="1" width="340" x="31" y="15" />
      <circle cx="388" cy="12" r="12" />
      <rect height="24" rx="0" ry="0" width="24" x="0" y="0" />
    </ContentLoader>
  )
}