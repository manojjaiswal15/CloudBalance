import React, { useEffect, useState } from 'react'
import { copyToClipboard, page1 } from '../config'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import page1image from '../../../assets/onboarding/page1img.png'
import page2image1 from '../../../assets/onboarding/page2img.png'
import page2image2 from '../../../assets/onboarding/page2img2.png'
import page2image3 from '../../../assets/onboarding/page2img3.png'
import page3image1 from '../../../assets/onboarding/page3img1.png'
import page3image2 from '../../../assets/onboarding/page3img2.png'
import page3image3 from '../../../assets/onboarding/page3img3.png'
import axios from 'axios';
import { account_base_url } from '../../../Service/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



// copy clipboard

export const CopyTextProps = ({ content }) => {
    return (
        <div className={`w-full border border-sky-600 h-[150px] overflow-y-scroll relative group group-hover:bg-sky-600`}>
            <div className='sticky right-1 top-1 cursor-pointer group-hover:bg-blue-600 group-hover:text-white'>
                <ContentCopyIcon onClick={() => copyToClipboard(JSON.stringify(content))} className='text-sky-600 absolute group-hover:text-blue-600 right-1 top-1  z-50 group-hover:rounded-md text-xs' />
            </div>
            <pre className='whitespace-pre-wrap text-xs group-hover:bg-sky-50'>
                <code className='text-sky-600'>
                    {JSON.stringify(content, null, 2)}
                </code>
            </pre>
        </div>
    )
}

// first page
const UserOnboardingFirstPage = ({ onboardingAddAccountData, setOnboardingAddAccountData, setIndexPage }) => {

    const navigate = useNavigate()

    function handleOnChangeAccount(e) {
        e.preventDefault();
        setOnboardingAddAccountData({ ...onboardingAddAccountData, [e.target.name]: e.target.value })
    }

    // diabled and enabled button
    const isFormValid = onboardingAddAccountData.arn?.trim() && onboardingAddAccountData.accountId?.trim() && onboardingAddAccountData.accountName?.trim();


    return (
        <div className='bg-transparent gap-3 flex flex-col items-start py-6'>
            <h3 className='text-lg font-bold'>Create an IAM Role</h3>
            <p className='text-gray-600 text-base'>Create an IAM Role by following these steps</p>
            {/* iam */}
            <div className='bg-white border border-gray-300 rounded-md p-5 w-full flex flex-col items-start gap-4'>
                <div className='flex items-center gap-3'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>1</span>
                    <p>Log into AWS account & <a className='text-sky-600 underline' href="#">Create an IAM Role.</a></p>
                </div>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>2</span>
                    <p>In theTrusted entity typesection, selectCustom trust policy.Replace the prefilled policy with the policy provided below -</p>
                    <CopyTextProps content={page1} />
                </div>
                <div className='flex items-start gap-3'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>3</span>
                    <p>Click on <span className='font-bold'>Next</span> to go to the Add permissions page. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on <span className='font-bold'>Next</span>.</p>
                </div>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>4</span>
                    <p>In the Role name field, enter the below-mentioned role name, and click on <span className='font-bold'>Create Role -</span></p>
                    {/* copyclipboard */}
                    <div className={`w-full pt-3 pl-3 border border-sky-600 h-12 overflow-y-scroll relative group group-hover:bg-sky-600`}>
                        <div clafieldssName='sticky right-1 top-1 cursor-pointer group-hover:bg-blue-600 group-hover:text-white'>
                            <ContentCopyIcon onClick={() => copyToClipboard("CK-Tuner-Role-dev2")} className='text-sky-600 absolute group-hover:text-blue-600 right-1 top-1  z-50 group-hover:rounded-md text-xs cursor-pointer' />
                        </div>
                        <p className='text-sky-600 text-base'>
                            CK-Tuner-Role-dev2
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>5</span>
                    <p>Go to the newly create IAM Role and copy the Role ARN -</p>
                    <img src={page1image} alt="" />
                </div>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>6</span>
                    <p>Paste the copied Role ARN below -</p>

                </div>
                {/* input data */}
                <form className='grid grid-cols-2 w-full gap-3'>
                    <div className='w-full'>
                        <p className='text-sm font-light text-gray-600'>Enter the IAM Role ARN </p>
                        <input className='text-gray-600 border border-gray-400 py-2 px-2 w-2/3' onChange={e => handleOnChangeAccount(e)} value={onboardingAddAccountData.arn} name="arn" type="text" placeholder='Enter the IAM Role ARN' required/>
                    </div>
                    <div className='w-full'>
                        <p className='text-sm font-light text-gray-600'>Enter Account ID </p>
                        <input className='text-gray-600 border border-gray-400 py-2 px-2 w-2/3' onChange={e => handleOnChangeAccount(e)} value={onboardingAddAccountData.accountId} name="accountId" type="text" placeholder='Enter Account ID ' required/>
                    </div>
                    <div className='w-full'>
                        <p className='text-sm font-light text-gray-600'>Enter Account Name </p>
                        <input className='text-gray-600 border border-gray-400 py-2 px-2 w-2/3' onChange={e => handleOnChangeAccount(e)} value={onboardingAddAccountData.accountName} name="accountName" type="text" placeholder='Enter Account Name' required/>
                    </div>
                </form>
            </div>

            {/* buttom*/}
            <div className='flex items-center justify-between w-full'>
                <button onClick={() => navigate("/dashboard/onboarding")} className='px-4 py-2 text-center text-sky-600 border border-sky-600 rounded-md cursor-pointer'>Cancel</button>
                <div className='flex items-center gap-3'>
                    <button disabled={!isFormValid} onClick={() => setIndexPage((prev) => prev + 1)} className={`px-4 py-2 rounded-md border text-center ${isFormValid  ? 'bg-sky-600 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'  }`}> Next - Add Customer Managed Policies</button>
                </div>
            </div>
        </div>
    )
}

// second page
const UserOnboardingSecondPage = ({ setIndexPage }) => {
    const navigate = useNavigate()
    return (
        <div className='bg-transparent gap-3 flex flex-col items-start py-6'>
            <h3>Add Customer Managed Policies</h3>
            <p>Create an Inline policy for the role by following these steps</p>
            {/* component */}
            <div className='bg-white border border-gray-300 rounded-md p-5 w-full flex flex-col items-start gap-4'>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>1</span>
                    <p>Go to the <a className='text-sky-600 underline' href="#">CK-Tuner-Role</a></p>
                    <img src={page2image1} alt="" />
                </div>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>2</span>
                    <p>In Permission policies, click on <span className='font-bold'> Add permissions {'>'} Attach Policy</span> </p>
                    <img src={page2image2} alt="" />
                </div>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>3</span>
                    <p>IFilter by Type {'>'} Customer managed then search for <span className='font-bold'>cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials , cktuner-SchedulerPolicy</span> and select them. </p>
                    <img src={page2image3} alt="" />
                </div>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>3</span>
                    <p>Now, click on <span className='font-bold'>Add permissions </span></p>
                </div>
            </div>
            {/* buttom*/}
            <div className='flex items-center justify-between w-full'>
                <button onClick={() => navigate("/dashboard/onboarding")} className='px-4 py-2 text-center text-sky-600 border border-sky-600 rounded-md cursor-pointer'>Cancel</button>
                <div className='flex items-center gap-3'>
                    <button onClick={() => setIndexPage((prev) => prev - 1)} className='px-4 py-2 text-center text-sky-600 border border-sky-600 rounded-md cursor-pointer'>Back - Create an IAM role</button>
                    <button onClick={() => setIndexPage((prev) => prev + 1)} className='px-4 py-2 text-center bg-sky-600 border text-white rounded-md cursor-pointer'>Next - Setup CUR Replication</button>
                </div>
            </div>
        </div>
    )
}

// third page

const UserOnboardingThirdPage = ({ setIndexPage, onboardingAddAccountData }) => {

    const userToken = localStorage.getItem("token")
    const navigate = useNavigate()

    async function submitHandlerData() {
        try {
            const response = await axios.post(`${account_base_url}/add`, onboardingAddAccountData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            })

            if (response.status) {
                toast.success("Account added")
                navigate("/dashboard/onboarding")
            }
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <div className='bg-transparent gap-3 flex flex-col items-start py-6'>
            <h3>Create Cost & Usage Report</h3>
            <p>Create a Cost & Usage Report by following these steps</p>
            {/* component */}
            <div className='bg-white border border-gray-300 rounded-md p-5 w-full flex flex-col items-start gap-4'>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>1</span>
                    <p>Go to <a className='text-sky-600 underline' href="#">Cost and Usage Reports</a> in the Billing Dashboard and click on Create report.</p>
                </div>
                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>2</span>
                    <p> Name the report as shown below and select the Include resource IDs checkbox -</p>
                    {/* <CopyTextProps content={"ck-tuner-275595855473-hourly-cur"} heightSize={40} /> */}
                    <div className={`w-full pt-3 pl-3 border border-sky-600 h-12 overflow-y-scroll relative group group-hover:bg-sky-600`}>
                        <div className='sticky right-1 top-1 cursor-pointer group-hover:bg-blue-600 group-hover:text-white'>
                            <ContentCopyIcon onClick={() => copyToClipboard("ck-tuner-275595855473-hourly-cur")} className='text-sky-600 absolute group-hover:text-blue-600 right-1 top-1  z-50 group-hover:rounded-md text-xs' />
                        </div>
                        <p className='text-sky-600 text-base'>
                            ck-tuner-275595855473-hourly-cur
                        </p>
                    </div>

                </div>
                <p className='text-xs text-gray-600'>Ensure that the following configuration is checked</p>
                {/*  */}
                <p>Click on Next</p>
                <img className='w-full' src={page3image1} alt="" />

                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>3</span>
                    <p> In Configure S3 Bucket, provide the name of the S3 bucket that was created -</p>
                </div>
                <p className='text-xs text-gray-600'>Ensure that the following configuration is checked</p>
                {/*  */}
                <p>Click on <span className='font-bold'>Save</span></p>
                <img className='w-full' src={page3image2} alt="" />

                <div className='flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>4</span>
                    <p> In the Delivery options section, enter the below-mentioned Report path prefix -</p>
                    <div className={`w-full pt-3 pl-3 border border-sky-600 h-12 overflow-y-scroll relative group group-hover:bg-sky-600`}>
                        <div className='sticky right-1 top-1 cursor-pointer group-hover:bg-blue-600 group-hover:text-white'>
                            <ContentCopyIcon onClick={() => copyToClipboard("275595855473")} className='text-sky-600 absolute group-hover:text-blue-600 right-1 top-1  z-50 group-hover:rounded-md text-xs' />
                        </div>
                        <p className='text-sky-600 text-base'>
                            275595855473
                        </p>
                    </div>
                </div>
                <p className='text-xs text-gray-600 '>Additionally, ensure that the following checks are in place</p>
                <p className='text-xs text-gray-600'>Time granularity:</p>
                <div className='flex items-center gap-3'>
                    <input disabled={'disabled'} type="radio" name="" id="" /> <span className='text-base font-semibold'>Hourly</span>
                </div>
                <p className='mt-4 text-xs text-gray-600 '>Please make sure these checks are Enabled in Enable report data integration for:</p>
                <div className='flex items-center gap-3'>
                    <input disabled={'disabled'} type="checkbox" name="" id="" /> <span className='text-base font-semibold'>Amazon Athena</span>
                </div>
                <img src={page3image3} alt="" />
                <div className='mt-4 flex items-center gap-3 flex-wrap w-full'>
                    <span className='bg-gray-400 text-white w-6 h-6 rounded-full text-center'>5</span>
                    <p> Click on <span className='font-semibold'>Next. Now,</span> review the configuration of the Cost and Usage Report. Once satisfied, click on <span className='font-semibold'>Create Report.</span></p>
                </div>
            </div>
            {/* buttom*/}
            <div className='flex items-center justify-between w-full'>
                <button onClick={() => navigate("/dashboard/onboarding")} className='px-4 py-2 text-center text-sky-600 border border-sky-600 rounded-md cursor-pointer'>Cancel</button>
                <div className='flex items-center gap-3'>
                    <button onClick={() => setIndexPage((prev) => prev - 1)} className='px-4 py-2 text-center text-sky-600 border border-sky-600 rounded-md cursor-pointer'>Back - Setup CUR Replication</button>
                    <button onClick={submitHandlerData} className='px-4 py-2 text-center bg-sky-600 border text-white rounded-md cursor-pointer'>Submit</button>
                </div>
            </div>
        </div>
    )
}


const pages = [UserOnboardingFirstPage, UserOnboardingSecondPage, UserOnboardingThirdPage]


const UserOnboardingPage = () => {
    const [indexPage, setIndexPage] = useState(0);
    const Active = pages[indexPage]
    const [onboardingAddAccountData, setOnboardingAddAccountData] = useState({
        arn: "",
        accountId: "",
        accountName: ""
    })

    return (
        <div className='pb-3'>
            <Active onboardingAddAccountData={onboardingAddAccountData} setOnboardingAddAccountData={setOnboardingAddAccountData} setIndexPage={setIndexPage} />
        </div>
    )

}



export default UserOnboardingPage;