    import {View} from "react-native"; // Error icon
    import {Toast, ToastDescription, ToastTitle, useToast} from "@/components/ui/toast";
    import {Icon, AlertCircleIcon} from "@/components/ui/icon";

    interface IProps {
        title: string;
        message: string | undefined;
    }

    export function BullPenErrorToast  ({title, message }: IProps) {
        const toast = useToast();
        const showToast = () => {
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }: {id: any}) => (
                    <Toast nativeID={id} variant="solid" action="error" className={"bg-red-700"}>
                        <View className="flex flex-row space-y-1 justify-center items-center">
                            <Icon as={AlertCircleIcon} size="xl" color="white" />
                            <View className={'ml-2'}>
                                <ToastTitle>{title}</ToastTitle>
                                <ToastDescription>{message}</ToastDescription>
                            </View>
                        </View>
                    </Toast>
                ),
            });
        };

        return { showToast };
    }

