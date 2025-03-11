import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import {CloseIcon, SearchIcon} from "@/components/ui/icon";
import {Pressable} from "react-native";

interface IProps {
    searchText: string;
    onChangeText: (text: string) => void;
}

export function BullPenSearchField({searchText, onChangeText}: IProps) {
    return (
        <Input
            size="md"
            className={`p-2 bg-primaryCardBackground border-primaryBorder mb-2 h-16 rounded-xl`}
        >
            <InputSlot>
                <InputIcon as={SearchIcon} className={'text-gray-50 '} size="md" />
            </InputSlot>
            <InputField
                value={searchText}
                placeholder="Search Solana address here..."
                onChangeText={(newText) => onChangeText(newText)}
                className="text-white"
            />
            <InputSlot>
                <Pressable onPress={() => onChangeText("")}>
                    <InputIcon as={CloseIcon} className={'text-gray-50'} size="md" />
                </Pressable>
            </InputSlot>
        </Input>
    );
}