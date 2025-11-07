interface InfoCardProps {
    title: string;
    value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value }) => {

    return (
        <div className="flex w-auto p-6 flex-col justify-center items-start gap-2 rounded-2xl border-[0.5px] border-[#BFC4CD] h-[80px]">
            <p className="text-[#0D1421]">{title}</p>
            {value && <span className="text-[#616E85] font-poppins text-[16px] font-light leading-[24px]">
                {value}
            </span>}
        </div>
    );
};

export default InfoCard;
