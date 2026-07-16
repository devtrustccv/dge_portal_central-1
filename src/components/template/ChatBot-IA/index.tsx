/*
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

export default AppIa;*/
//
import Script from "next/script";

const AppIa = () => {

    const tawkToScriptUrl = process.env.NEXT_PUBLIC_TAWK_TO_SCRIPT_URL || "";

    if (!tawkToScriptUrl) {
        return null;
    }

    return (
        <Script
            id="tawk-to-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
                    (function() {
                        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                        s1.async = true;
                        s1.src = ${JSON.stringify(tawkToScriptUrl)};
                        s1.charset = "UTF-8";
                        s1.setAttribute("crossorigin", "*");
                        s0.parentNode.insertBefore(s1, s0);
                    })();
                `,
            }}
        />
    );

};



export default AppIa;