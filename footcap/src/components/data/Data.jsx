//collections images

import collectionImg1 from '../images/collection-1.jpg'
import collectionImg2 from '../images/collection-2.jpg'
import collectionImg3 from '../images/collection-3.jpg'

//Products Images

import products1 from '../images/product-1.jpg'
import products2 from '../images/product-2.jpg'
import products3 from '../images/product-3.jpg'
import products4 from '../images/product-4.jpg'
import products5 from '../images/product-5.jpg'
import products6 from '../images/product-6.jpg'
import products7 from '../images/product-7.jpg'
import products8 from '../images/product-8.jpg'

//cover Images

import CovImage1 from '../images/cta-1.jpg'
import CovImage2 from '../images/cta-2.jpg'

//Services Part

import {GrDeliver} from 'react-icons/gr'
import {BsCreditCard2Back , BsBoxSeam} from 'react-icons/bs'
import {BiSupport} from 'react-icons/bi'

//images part

import Inst1 from '../images/insta-1.jpg'
import Inst2 from '../images/insta-2.jpg'
import Inst3 from '../images/insta-3.jpg'
import Inst4 from '../images/insta-4.jpg'
import Inst5 from '../images/insta-5.jpg'
import Inst6 from '../images/insta-6.jpg'
import Inst7 from '../images/insta-7.jpg'
import Inst8 from '../images/insta-8.jpg'

// Footer part
import {MdLocationOn} from 'react-icons/md'
import { IoCall} from 'react-icons/io5'
import {FaEnvelope} from 'react-icons/fa'


export const navbar=[
    {
        link:'Home',
        path:'/',
    },
    {
        link:'About',
        path:'/about',
    },
    {
        link:'Products',
        path:'/products',
    },
    {
        link:'Shop',
        path:'/shop',
    },
    {
        link:'Blog',
        path:'/blog',
    },
]
export const collectionData=[
    {
        background:'b3e140',
        image1:collectionImg1,
        name:'MEN COLLECTIONS',
    },
    {
        background:'eebdea',
        image2:collectionImg2,
        name:'WOMEN COLLECTIONS',
    },
    {
        background:'e7cfcf',
        image3:collectionImg3,
        name:'SPORT COLLECTIONS',
    },
]
export const companyData=[
    {
        background:'orange',
        text:'All',
    },
    {
        text:'Nike',
    },
    {
        text:'Adidas',
    },
    {
        text:'Puma',
    },
    {
        text:'Bata',
    },
    {
        text:'Apex',
    },
]
export const productData=[
    {
        image:products1,
        text:' Men / Women ',
        name:'Running Sneaker Shoes',
        price:'180.85',
    },
    {
        image:products2,
        text:' Men / Sport',
        name:'Leather Mens Slipper',
        price:'190.85',
        new:'new',

    },
    {
        image:products3,
        text:' Men / Women ',
        name:'Simple Fabric Shoe',
        price:'160.85',

    },
    {
        image:products4,
        text:' Men / Women ',
        name:'Air Jordan 7 Retro ',
        price:'170.85',

    },
    {
        image:products5,
        text:' Men / Women ',
        name:'Nike Air Max 270 SE',
        price:'120.85',

    },
    {
        image:products6,
        text:' Men / Women ',
        name:'Adidas Sneakers Shoes',
        price:'100.85',
        new:'new',

    },
    {
        image:products7,
        text:' Men / Women ',
        name:'Nike Basketball shoes',
        price:'200.85',
        new:'new',

    },
    {
        image:products8,
        text:' Men / Women ',
        name:'Adidas Sneakers Shoes',
        price:'100.85',
        new:'new',

    },
]
export const CoverData=[
    {
        text:'Adidas Shoes',
        image:CovImage1,
        name:'The Summer Sale Off 50%',
    },
    {
        text:'Nike Shoes',
        image:CovImage2,
        name:'Makes Yourself Keep Sporty',
    },
]
export const ServicesData=[

    {
        name:'QUICK PAYMENT',
        text:'100% secure payment ',
        icon:<BsCreditCard2Back/>,
    },
    {
        name:'Free RETURNS',
        text:'Money back in 30 days',
        icon:<BsBoxSeam/>,
    },
    {
        name:'24/7 SUPPORT',
        text:'Get Quick Support ',
        icon:<BiSupport/>,
    },
]
export const instData=[
    { img:Inst1 },
    { img:Inst2 },
    { img:Inst3 },
    { img:Inst4 },
    { img:Inst5 },
    { img:Inst6 },
    { img:Inst7 },
    { img:Inst8 },
]
export const contactData=[
    {
        icon:<MdLocationOn/>,
        text:'2751 S Parker Rd, Aurora',
    },
    {
        icon:<IoCall/>,
        text:'+9641234567891',
    },
    {
        icon:<FaEnvelope/>,
        text:'hussain@gmail.com',
    },
]
export const AccountData=[
    {
        link:'My Account',
    },
    {
        link:'View Cart',
    },
    {
        link:'Wishlist',
    },
    {
        link:'Compare',
    },
    {
        link:'New Products',
    },
]
export const TimeData=[
    {
        day:'Mon-Tue',
        time:'8AM-10PM',
    },
    {
        day:'Wed',
        time:'7AM-8PM',
    },
    {
        day:'Fir',
        time:'7AM-12PM',
    },
    {
        day:'Sat',
        time:'9AM-8PM',
    },
    {
        day:'Sun',
        time:'Closed',
    },
]










































