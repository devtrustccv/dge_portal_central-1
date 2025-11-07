'use client'

import { Bubble } from "@typebot.io/nextjs";

const AppIa = () => {
    const typebotId = process.env.NEXT_PUBLIC_TYPEBOT_ID!;
    const message = process.env.NEXT_PUBLIC_TYPEBOT_MESSAGE!;
    const avatarUrl = process.env.NEXT_PUBLIC_TYPEBOT_AVATAR_URL!;
    const backgroundColor = process.env.NEXT_PUBLIC_TYPEBOT_BG_COLOR!;
    const customIconSrc = process.env.NEXT_PUBLIC_TYPEBOT_ICON_URL!;
    const host = process.env.NEXT_PUBLIC_TYPEBOT_HOST!;

    return (
        <Bubble
            typebot={typebotId}
            apiHost={host}
            previewMessage={{
                message,
                autoShowDelay: 5000,
                avatarUrl,
            }}
            theme={{
                button: {
                    backgroundColor,
                    customIconSrc,
                },
            }}
        />
    );
};

export default AppIa;