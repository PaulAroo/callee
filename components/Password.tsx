import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { IoMdEyeOff, IoMdEye } from "react-icons/io"

function PasswordInput() {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return (
		<InputGroup>
			<Input
				variant={"flushed"}
				type={show ? "text" : "password"}
				placeholder="Password"
			/>
			<InputRightElement color={"brand.purple"}>
				<Button onClick={handleClick}>
					{show ? <IoMdEyeOff /> : <IoMdEye />}
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export default PasswordInput
