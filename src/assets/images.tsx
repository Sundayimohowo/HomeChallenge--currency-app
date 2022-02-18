import { useEffect, useState } from "react";
import aed from "./flags/aed.png";
import ars from "./flags/ars.png";
import aud from "./flags/aud.png";
import bbd from "./flags/bbd.png";
import bgn from "./flags/bgn.png";
import brl from "./flags/brl.png";
import byn from "./flags/byn.png";
import cad from "./flags/cad.png";
import chf from "./flags/chf.png";
import clp from "./flags/clp.png";
import cny from "./flags/cny.png";
import czk from "./flags/czk.png";
import dkk from "./flags/dkk.png";
import eur from "./flags/eur.png";
import fjd from "./flags/fjd.png";
import gbp from "./flags/gbp.png";
import hkd from "./flags/hkd.png";
import hrk from "./flags/hrk.png";
import huf from "./flags/huf.png";
import idr from "./flags/idr.png";
import ils from "./flags/ils.png";
import inr from "./flags/inr.png";
import jpy from "./flags/jpy.png";
import kes from "./flags/kes.png";
import khr from "./flags/khr.png";
import ikr from "./flags/lkr.png";
import mad from "./flags/mad.png";
import mxn from "./flags/mxn.png";
import nok from "./flags/nok.png";
import nzd from "./flags/nzd.png";
import omr from "./flags/omr.png";
import pen from "./flags/pen.png";
import pln from "./flags/pln.png";
import qar from "./flags/qar.png";
import rub from "./flags/rub.png";
import sar from "./flags/sar.png";
import sek from "./flags/sek.png";
import sgd from "./flags/sgd.png";
import thb from "./flags/thb.png";
import tyr from "./flags/try.png";
import uah from "./flags/uah.png";
import usd from "./flags/usd.png";
import vnd from "./flags/vnd.png";
import zar from "./flags/zar.png";


export const flags = [
    {
        name: "aed",
        flag: aed
    },
    {
        name: "ars",
        flag: ars
    },
    {
        name: "aud",
        flag: aud
    },
    {
        name: "bbd",
        flag: bbd
    },
    {
        name: "bgn",
        flag: bgn
    },
    {
        name: "brl",
        flag: brl
    },
    {
        name: "byn",
        flag: byn
    },
    {
        name: "cad",
        flag: cad
    },
    {
        name: "chf",
        flag: chf
    },
    {
        name: "clp",
        flag: clp
    },
    {
        name: "cny",
        flag: cny
    },
    {
        name: "czk",
        flag: czk
    },
    {
        name: "dkk",
        flag: dkk
    },
    {
        name: "eur",
        flag: eur
    },
    {
        name: "fjd",
        flag: fjd
    },
    {
        name: "gbp",
        flag: gbp
    },
    {
        name: "hkd",
        flag: hkd
    },
    {
        name: "hrk",
        flag: hrk
    },
    {
        name: "huf",
        flag: huf
    },
    {
        name: "idr",
        flag: idr
    },
    {
        name: "ils",
        flag: ils
    },
    {
        name: "inr",
        flag: inr
    },
    {
        name: "jpy",
        flag: jpy
    },
    {
        name: "kes",
        flag: kes
    },
    {
        name: "khr",
        flag: khr
    },
    {
        name: "ikr",
        flag: ikr
    },
    {
        name: "mad",
        flag: mad
    },
    {
        name: "mxn",
        flag: mxn
    },
    {
        name: "nok",
        flag: nok
    },
    {
        name: "nzd",
        flag: nzd
    },
    {
        name: "omr",
        flag: omr
    },
    {
        name: "pen",
        flag: pen
    },
    {
        name: "pln",
        flag: pln
    },
    {
        name: "qar",
        flag: qar
    },
    {
        name: "rub",
        flag: rub
    },
    {
        name: "sar",
        flag: sar
    },
    {
        name: "sek",
        flag: sek
    },
    {
        name: "sgd",
        flag: sgd
    },
    {
        name: "thb",
        flag: thb
    },
    {
        name: "tyr",
        flag: tyr
    },
    {
        name: "uah",
        flag: uah
    },
    {
        name: "usd",
        flag: usd
    },
    {
        name: "vnd",
        flag: vnd
    },
    {
        name: "zar",
        flag: zar
    },

];
// type flagImageProps ={
//     style: any,
//     src: any
// }
// const FlagImages:React.FC<flagImageProps>=({src,style})=>{
//     const [sourceImg, setSrc]: any = useState([]);
//     useEffect(()=>{
//         flags.map((single)=>{
//             if (single.name === src) {
//                 setSrc([...sourceImg, {single}]);
//             }
//         })
//     })
//     return(
//         // sourceImg.map((ref: any)=>ref.name === src && <img src={ref.flag} alt={ref.name} style={{...style}} />)
//         <img src={flags[0].flag} alt="" />
//     )
// }

export default flags;