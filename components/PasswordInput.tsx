import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { IoMdEyeOff, IoMdEye } from "react-icons/io"

function PasswordInput({
	handleInputchange,
}: {
	handleInputchange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return (
		<InputGroup>
			<Input
				pl="0.5rem"
				isRequired
				variant={"flushed"}
				type={show ? "text" : "password"}
				placeholder="Password"
				id="password"
				focusBorderColor="brand.purple.100"
				onChange={handleInputchange}
			/>
			<InputRightElement>
				<Button
					color="brand.purple.100"
					variant="ghost"
					p="0px"
					onClick={handleClick}
				>
					{show ? <IoMdEye /> : <IoMdEyeOff />}
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export default PasswordInput
