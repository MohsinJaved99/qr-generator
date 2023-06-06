import './App.css';
import QRCodeStyling from "qr-code-styling";
import React, {useEffect, useRef, useState} from 'react';
const qrCode = new QRCodeStyling({
    width: 300,
    height: 400,
    imageOptions: {
        crossOrigin: "anonymous"
    }
});
export default function App() {
    const ref = useRef(null);
    const [url, setUrl] = useState("");
    const [centerImage, setCenterImage] = useState("");
    const [color, setColor] = useState("#000");
    const [dotType, setDotType] = useState("dot");
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);
    const [imageMargin, setImageMargin] = useState(10);
    const [fileExt, setFileExt] = useState("png");
    const [cornerType, setCornerType] = useState("square");
    const [cornerColor, setCornerColor] = useState("#000");
    const [background, setBackground] = useState("#ffffff");

    useEffect(() => {
        qrCode.append(ref.current);
    }, []);

    useEffect(() => {
        qrCode.update({
            width: width,
            height: height,
            data: url,
            image: centerImage,
            dotsOptions: {
                color: color,
                type: dotType
            },
            imageOptions: {
                margin: imageMargin
            },
            backgroundOptions: {
                color: background=="white"?"#ffffff":"rgba(0,0,0,0)",
            },
            cornersSquareOptions: {
                type: cornerType,
                color: cornerColor
            }
        });
    }, [width, height, url, centerImage, color, dotType, imageMargin, cornerType, cornerColor, background]);

    const handleWidth = (event) => {
        event.preventDefault();
        setWidth(event.target.value);
    };

    const handleHeight = (event) => {
        event.preventDefault();
        setHeight(event.target.value);
    };

    const handleContent = (event) => {
        event.preventDefault();
        setUrl(event.target.value);
    };

    const handleColor = (event) => {
        event.preventDefault();
        setColor(event.target.value);
    };

    const handleDotType = (event) => {
        event.preventDefault();
        setDotType(event.target.value);
    };

    const handleCornerType = (event) => {
        event.preventDefault();
        setCornerType(event.target.value);
    };

    const handleCornerColor = (event) => {
        event.preventDefault();
        setCornerColor(event.target.value);
    };

    const handleImageMargin = (event) => {
        event.preventDefault();
        setImageMargin(event.target.value);
    };

    const handleCenterImage = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const tempImagePath = e.target.result;
                console.log(tempImagePath);
                setCenterImage(tempImagePath);
                // Use the tempImagePath as needed (e.g., display the image)
            };
            reader.readAsDataURL(file);
        }
    };

    const onExtensionChange = (event) => {
        setFileExt(event.target.value);
    };

    const onDownloadClick = () => {
        qrCode.download({
            extension: fileExt
        });
    };

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 p-4 gap-4">
            <div className="border-2 border-solid border-gray-300 p-2 rounded">
                <h3 className="text-xl font-medium text-center">QR Configuration</h3>
                <hr className="mt-2 mb-2"/>
                <div className="grid grid-cols-2 gap-3">
                    <div className={"p-2 relative"}>
                        <label htmlFor="width" className="block text-sm font-medium leading-6 text-gray-900">
                            QR Width <span className="text-[red]">*</span>
                        </label>
                        <input
                            type="number"
                            name="width"
                            id="width"
                            value={width}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            placeholder="Enter QR Width"
                            onChange={handleWidth}
                        />
                        <div className="pointer-events-none absolute inset-y-0 pt-4 right-0 flex items-center pr-4">
                            <span className="text-gray-500 sm:text-md">px</span>
                        </div>
                    </div>
                    <div className={"p-2 relative"}>
                        <label htmlFor="width" className="block text-sm font-medium leading-6 text-gray-900">
                            QR Height <span className="text-[red]">*</span>
                        </label>
                        <input
                            type="number"
                            name="width"
                            id="width"
                            value={height}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            placeholder="Enter QR Height"
                            onChange={handleHeight}
                        />
                        <div className="pointer-events-none absolute inset-y-0 pt-4 right-0 flex items-center pr-4">
                            <span className="text-gray-500 sm:text-md">px</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className={"p-2"}>
                        <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                            QR Code Type <span className="text-[red]">*</span>
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={dotType}
                            onChange={handleDotType}
                            className="block w-full rounded-md border-0 bg-transparent py-1.5 pl-2 pr-2 ring-1 ring-inset ring-gray-300 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm"
                        >
                            {/*<option value="dot">Dot</option>*/}
                            <option value="square">Square</option>
                            <option value="dots">Dots</option>
                            <option value="classy">Classy</option>
                            <option value="rounded">Rounded</option>
                            <option value="classy-rounded">Classy-Rounded</option>
                            <option value="extra-rounded">Extra-Rounded</option>
                        </select>
                    </div>
                    <div className={"p-2"}>
                        <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
                            QR Code Color <span className="text-[red]">*</span>
                        </label>
                        <input
                            type="color"
                            name="color"
                            id="color"
                            value={color}
                            className="block h-[33px] w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            placeholder="Enter QR Content"
                            onChange={handleColor}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className={"p-2"}>
                        <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                            QR Corner Type <span className="text-[red]">*</span>
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={cornerType}
                            onChange={handleCornerType}
                            className="block w-full rounded-md border-0 bg-transparent py-1.5 pl-2 pr-2 ring-1 ring-inset ring-gray-300 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm"
                        >
                            {/*<option value="dot">Dot</option>*/}
                            <option value="square">Square</option>
                            <option value="dot">Dot</option>
                            <option value="extra-rounded">Extra-Rounded</option>
                        </select>
                    </div>
                    <div className={"p-2"}>
                        <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
                            QR Corner Color <span className="text-[red]">*</span>
                        </label>
                        <input
                            type="color"
                            name="color"
                            id="color"
                            value={cornerColor}
                            className="block h-[33px] w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            onChange={handleCornerColor}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className={"p-2"}>
                        <label htmlFor="center-image" className="block text-sm font-medium leading-6 text-gray-900">
                            Center Image
                        </label>
                        <input
                            type="file"
                            name="center-image"
                            id="center-image"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            onChange={handleCenterImage}
                            accept=".png,.jpg,.jpeg"
                        />
                    </div>
                    <div className={"p-2 relative"}>
                        <label htmlFor="width" className="block text-sm font-medium leading-6 text-gray-900">
                            Image Margin
                        </label>
                        <input
                            type="number"
                            name="margin"
                            id="margin"
                            value={imageMargin}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            placeholder="Enter Image Margin"
                            onChange={handleImageMargin}
                        />
                        <div className="pointer-events-none absolute inset-y-0 pt-4 right-0 flex items-center pr-4">
                            <span className="text-gray-500 sm:text-md">px</span>
                        </div>
                    </div>
                </div>
                <div className={"p-2"}>
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        QR Content <span className="text-[red]">*</span>
                    </label>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        value={url}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                        placeholder="Enter QR Content"
                        onChange={handleContent}
                    />
                </div>
                <hr className="mt-2 mb-2"/>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-2">
                        <label htmlFor="center-image" className="block text-sm font-medium leading-6 text-gray-900">
                            Export Format <span className="text-[red]">*</span>
                        </label>
                        <select onChange={onExtensionChange} value={fileExt} className="block w-full rounded-md border-0 bg-transparent py-1.5 pl-2 pr-2 ring-1 ring-inset ring-gray-300 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm">
                            <option value="png">PNG</option>
                            <option value="jpeg">JPEG</option>
                            <option value="webp">WEBP</option>
                            <option value="svg">SVG</option>
                        </select>
                    </div>
                    <div className={"p-2"}>
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Background <span className="text-[red]">*</span>
                        </label>
                        <input id="transparent" className="peer/published" type="radio" name="background" value="transparent" onClick={(e) => setBackground(e.target.value)}/>
                        <label htmlFor="transparent" className=""> Transparent</label>
                        <input id="white" className="peer/published ml-2" type="radio" name="background" checked={true} value="white" onClick={(e) => setBackground(e.target.value)}/>
                        <label htmlFor="white" className=""> White</label>
                    </div>
                </div>
                <div className="p-2">
                    <button
                        className={"mt-3 block w-full rounded-md "+ (width && height && color && dotType && url && cornerColor && cornerType && background ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-[pointer]":"bg-gray-600 cursor-[not-allowed]") +" px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm"}
                        onClick={onDownloadClick}
                        disabled={(width && height && color && dotType && url && cornerColor && cornerType && background ? false:true)}
                    >Download</button>
                </div>
            </div>
            <div className="h-[fit-content] md:col-span-2 border-2 border-solid border-gray-300 p-2 rounded flex-col items-center justify-between flex">
                <h3 className="text-lg font-medium text-center">QR Code</h3>
                <div className="w-fit mt-5 mb-5" ref={ref} />
            </div>
        </div>
    );
}