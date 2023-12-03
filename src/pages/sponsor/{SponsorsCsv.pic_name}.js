import * as React from "react"
import {Sponsor} from "../../components/Sponsor"

function SponsorPage2(props) {
  const { pic_name } = props.params
  return <Sponsor id={pic_name}></Sponsor>
}

export default SponsorPage2
