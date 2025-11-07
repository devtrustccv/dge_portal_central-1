
"use server";

import { getAllServices } from ".";
import { IServicesConnectionResponse } from "../type";

export async function getServicesByProfileId(profileId: string): Promise<IServicesConnectionResponse | null> {
    try {
        const services = await getAllServices(
            {
                profile: {
                    documentId: {
                        eq: profileId,
                    },
                },
            },
            { page: 1, pageSize: 10 }
        );

        return services || { nodes: [], pageInfo: { page: 1, pageCount: 1, pageSize: 10, total: 0 } };
    } catch (error) {
        console.error("Error fetching services:", error);
        return null;
    }
}
