import { FaHome, FaPiggyBank, FaMoneyBillWave , FaWallet, FaUserAlt, 
    FaUsers, FaMailBulk, FaMoneyCheck} from 'react-icons/fa';

export const InvestorNavLinks =[
    {
        id: "1",
        name : "Dashboard",
        icon: <FaHome />,
        link: '/dashboard'
    },
    {
        id: "2",
        name : "New Investment",
        icon: <FaPiggyBank />,
        link: "/new-investment"
    },
    {
        id: "3",
        name : "Deposit Funds",
        icon: <FaMoneyBillWave />,
        link: "/deposit-funds"
    },
    {
        id: "4",
        name : "My Wallet",
        icon: <FaWallet />,
        link: "/wallet"
    },
    {
        id: "5",
        name : "Profile",
        icon: <FaUserAlt />,
        link: "/profile"
    },
    {
        id: "6",
        name: "About Us",
        icon : <FaUsers />,
        link : "/about"
    },
    {
        id: "7",
        name: "Services",
        icon : <FaMailBulk />,
        link : "/services"
    },
    {
        id: "8",
        name: "Contact",
        icon : <FaMoneyCheck />,
        link : "/contact"
    },

]

export const NavLinks=[
    {
        id: "1",
        name: "About",
        icon : <FaUserAlt />,
        link : "/about"
    },
    {
        id: "2",
        name: "Services",
        icon : <FaMailBulk />,
        link : "/services"
    },
    {
        id: "3",
        name: "Contact",
        icon : <FaMoneyCheck />,
        link : "/contact"
    },
]