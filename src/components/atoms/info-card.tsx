export default function InfoCard({label,value}:{label:string;value?:string;}) {
  return (
    <div className="flex w-auto p-6 flex-col justify-center items-start gap-2 rounded-2xl border-[0.5px] border-[#BFC4CD]">
      <p className="text-[#0D1421]">{label}</p>
      <span className="text-[#616E85] font-poppins text-[16px] font-light leading-[24px]">
        {value}
      </span>
    </div>
  );
}
