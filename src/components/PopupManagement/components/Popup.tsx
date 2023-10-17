import tw, { TwStyle } from 'twin.macro';
import { css, SerializedStyles, Theme } from '@emotion/react';
import { useEffect, useRef } from 'react';
import cross from './close.svg';
import { Interpolation } from '@emotion/serialize';
import KEYBOARD_CODES from '@/utils/keyboard';
import Image from 'next/image';

type AppProps = {
    css?: Interpolation<Theme>,
    children?: React.ReactNode,
    close,
};

const Popup = ({
    close, children, background = 'white', ...props
} : AppProps) => {
    const modalBackdropRef = useRef(null);

    const handleClickOnModalBackdrop = e => {
        if (e.target === modalBackdropRef.current) {
            close();
        }
    };

    const handleEscapeOnModal = e => {
        const keyCode = e.which;
        if (keyCode === KEYBOARD_CODES.Escape) {
            close();
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEscapeOnModal);
        return () => {
            document.body.style.overflow = 'auto';

            window.removeEventListener('keydown', handleEscapeOnModal);
        };
    }, []);

    return (
        <div
            ref={modalBackdropRef}
            onMouseDown={handleClickOnModalBackdrop}
            css={tw`fixed flex flex-col w-full h-full bg-black bg-opacity-50 top-0 overflow-auto justify-between items-center z-[2]`}
        >
            <div />
            <div css={[tw`relative rounded-[12px] max-w-[calc(100% - 32px)] xl:max-w-[1300px] h-auto`, css`background: ${background};`]}>
                <button
                    css={tw`absolute z-1 top-[14px] right-[14px] w-[24px] h-[24px] flex-shrink-0 md:top-[24px] md:right-[24px]`}
                    type="button"
                    onClick={close}
                >
                    <Image css={tw`select-none`} alt="close" src={cross} />
                </button>
                <div
                    css={tw`p-[40px 30px] flex flex-col items-start`}
                    {...props}
                >
                    {children}
                </div>
            </div>
            <div />
        </div>
    );
};

export default Popup;
