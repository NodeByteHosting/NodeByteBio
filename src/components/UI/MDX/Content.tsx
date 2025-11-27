import clsx from "clsx";
import { LinkIcon } from "lucide-react";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { ComponentProps, createElement } from "react";
import Link from "next/link";

import { Card, Cards } from "./Card";
import { Pre } from "./Pre";

function heading<T extends keyof JSX.IntrinsicElements>(
    element: T,
    { id, children, ...props }: ComponentProps<T>
) {
    return createElement(element, {
        ...props,
        className: clsx(`group`, props.className),
        children: [
            <span id={id} className="absolute -mt-20" />,
            children,
            <a
                href={`#${id}`}
                className="opacity-0 group-hover:opacity-100 inline-block ml-2 text-muted-foreground"
            >
                <LinkIcon className="w-4 h-4" />
            </a>,
        ],
    });
}

export function MdxContent({ code }: { code: string }) {
    const MDX = useMDXComponent(code);

    // build a permissive components map to avoid strict MDX typing issues
    const components: Record<string, any> = {
        Card,
        Cards,
        pre: (props: any) => <Pre {...props} />,
        h1: (props: any) => heading("h1", props),
        h2: (props: any) => heading("h2", props),
        h3: (props: any) => heading("h3", props),
        h4: (props: any) => heading("h4", props),
        h5: (props: any) => heading("h5", props),
        h6: (props: any) => heading("h6", props),
        a: (props: any) => {
            const href = props.href as string | undefined;
            if (!href) return <></>;

            const isExternalUrl = !(href.startsWith("/") || href.startsWith("#"));

            return <Link {...props} href={href} target={isExternalUrl ? "_blank" : "_self"} rel={isExternalUrl ? "noreferrer" : undefined} />;
        },
    };

    return (
        <div className="prose prose-text prose-pre:grid prose-pre:border-[1px] prose-code:bg-secondary prose-code:p-1 max-w-none">
            <MDX components={components as any} />
        </div>
    );
}