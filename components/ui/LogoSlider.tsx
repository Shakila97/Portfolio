import Image from 'next/image';

const logos = [
    { name: 'Illustrator', src: '/illustrator.svg' },
    { name: 'Photoshop', src: '/Photoshop.svg' },
    { name: 'After Effects', src: '/After Effects.svg' },
    { name: 'Sketchbook', src: '/Sketchbook.svg' },
    { name: 'Dimension', src: '/Dimansion.svg' },
];

export function LogoSlider() {
    return (
        <div className="w-full py-12 flex flex-col items-center justify-center overflow-hidden">
            <div className="flex w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                    {logos.map((logo, index) => (
                        <li key={`logo-1-${index}`}>
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={150}
                                height={50}
                                className="h-12 w-auto opacity-60 hover:opacity-100 transition-all duration-300"
                            />
                        </li>
                    ))}
                </ul>
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                    {logos.map((logo, index) => (
                        <li key={`logo-2-${index}`}>
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={150}
                                height={50}
                                className="h-12 w-auto opacity-60 hover:opacity-100 transition-all duration-300"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
