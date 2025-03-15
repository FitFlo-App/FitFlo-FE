import {Drawer, DrawerClose, DrawerTrigger, DrawerTitle, DrawerDescription, DrawerFooter, DrawerContent, DrawerHeader} from "@/components/ui/drawer"
import {Handle, Position} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface CustomNodeProps {
    data: {
      label: string;
      info: string;
    };
}

const CustomNodeInput: React.FC<CustomNodeProps> = ({ data }) => {
    return (
        <>
            <div>
                <Drawer>
                    <DrawerTrigger className='w-48 text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm hover:bg-blue-700'>
                        {data.label}
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='text-center'>{data.label}</DrawerTitle>
                            <DrawerDescription>{data.info}</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose className='text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm'>Close</DrawerClose>
                        </DrawerFooter>

                    </DrawerContent>
                </Drawer>
            </div>

            <Handle className='w-1 h-1 bg-blue-400' type="source" position={Position.Bottom} id="bottom"/>
            <Handle className='w-1 h-1 bg-blue-400' type="source" position={Position.Left} id="left"/>
        </>
    );
};

const CustomNodeDefault: React.FC<CustomNodeProps> = ({ data }) => {
    return (
        <>
            <div>
                <Drawer>
                    <DrawerTrigger className='w-48 text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm hover:bg-blue-700'>
                        {data.label}
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='text-center'>{data.label}</DrawerTitle>
                            <DrawerDescription>{data.info}</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose className='text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm'>Close</DrawerClose>
                        </DrawerFooter>

                    </DrawerContent>
                </Drawer>
            </div>

            <Handle className='w-1 h-1 bg-blue-400' type="target" position={Position.Top} id="top"/>
            <Handle className='w-1 h-1 bg-blue-400' type="source" position={Position.Bottom} id="bottom"/>
        </>
    );
};
  
const CustomNodeLeft: React.FC<CustomNodeProps> = ({ data }) => {
    return (
        <>
            <div>
                <Drawer>
                    <DrawerTrigger className='w-48 text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm hover:bg-blue-700'>
                        {data.label}
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='text-center'>{data.label}</DrawerTitle>
                            <DrawerDescription>{data.info}</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose className='text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm'>Close</DrawerClose>
                        </DrawerFooter>

                    </DrawerContent>
                </Drawer>
            </div>

            <Handle className='w-1 h-1 bg-blue-400' type="target" position={Position.Top} />
            <Handle className='w-1 h-1 bg-blue-400' type="source" position={Position.Left} id="left"/>
            <Handle className='w-1 h-1 bg-blue-400' type="source" position={Position.Bottom} id="bottom"/>
        </>
    );
};

const CustomNodeRight: React.FC<CustomNodeProps> = ({ data }) => {
    return (
        <>
            <div>
                <Drawer>
                    <DrawerTrigger className='w-48 text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm hover:bg-blue-700'>
                        {data.label}
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='text-center'>{data.label}</DrawerTitle>
                            <DrawerDescription>{data.info}</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose className='text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm'>Close</DrawerClose>
                        </DrawerFooter>

                    </DrawerContent>
                </Drawer>
            </div>

            <Handle className='w-1 h-1 bg-blue-400' type="target" position={Position.Top} />
            <Handle className='w-1 h-1 bg-blue-400' type="source" position={Position.Right} id="right"/>
            <Handle className='w-1 h-1 bg-blue-400' type="source" position={Position.Bottom} id="bottom"/>
        </>
    );
};

const CustomNodeLeftChild: React.FC<CustomNodeProps> = ({ data }) => {
    return (
        <>
            <div>
                <Drawer>
                    <DrawerTrigger className='w-48 text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm hover:bg-blue-700'>
                        {data.label}
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='text-center'>{data.label}</DrawerTitle>
                            <DrawerDescription>{data.info}</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose className='text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm'>Close</DrawerClose>
                        </DrawerFooter>

                    </DrawerContent>
                </Drawer>
            </div>

            <Handle className='w-1 h-1 bg-blue-400' type="target" position={Position.Right} />
        </>
    );
};

const CustomNodeRightChild: React.FC<CustomNodeProps> = ({ data }) => {
    return (
        <>
            <div>
                <Drawer>
                    <DrawerTrigger className='w-48 text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm hover:bg-blue-700'>
                        {data.label}
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='text-center'>{data.label}</DrawerTitle>
                            <DrawerDescription>{data.info}</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose className='text-center px-4 py-2 bg-sky-300 border-2 border-blue-700 rounded-lg text-white text-sm'>Close</DrawerClose>
                        </DrawerFooter>

                    </DrawerContent>
                </Drawer>
            </div>

            <Handle className='w-1 h-1 bg-blue-400' type="target" position={Position.Left} />
        </>
    );
};

export {
    CustomNodeDefault,
    CustomNodeInput,
    CustomNodeLeft,
    CustomNodeLeftChild,
    CustomNodeRight,
    CustomNodeRightChild
}