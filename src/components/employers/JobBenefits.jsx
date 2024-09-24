/* eslint-disable react/prop-types */
const jobBenefit = [
    {
        name: "4OK Salary",
        id: 1
    },
    {
        name:"Distributed Team",
        id: 2
    },
    {
        name:"Distributed Team",
        id: 3
    },
    {
        name:"Distributed Team",
        id: 4
    },
    {
        name:"Distributed Team",
        id: 5
    },
    {
        name:"Distributed Team",
        id: 6
    },
    {
        name:"Distributed Team",
        id: 7
    },
]

function Benefit ({name}){
    return(
        <div className="bg-gray-200 text-[14px] min-w-fit px-4 py-2 rounded-sm cursor-pointer">
            {name}
        </div>
    )
}

const JobBenefits = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
        {
            jobBenefit.map((value)=>{
                return(
                    <Benefit key={value.id} name={value.name}/>
                )
            })
        }
        
    </div>
  )
}

export default JobBenefits