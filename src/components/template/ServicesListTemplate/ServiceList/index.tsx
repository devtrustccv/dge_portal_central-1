import { IServiceNode } from '@/services/services/type';
import React from 'react';
import { ServiceItem } from '../../ServicesDetailsTemplate/ServiceItem';
import Link from 'next/link';


interface ServiceListProps {
    services: IServiceNode[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {services.map((service) => (
                <Link href={`/servicos/${service?.slug}`} key={service?.slug}>
                    <ServiceItem  {...service} style='border' />
                </Link>
            ))}
        </div>
    );
};

export default ServiceList;
