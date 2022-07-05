import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import ADD_SIGN from "../lib/apollo/queries/addSign";


const NewSign = () => {
    const router = useRouter();
    const [formState, setFormState] = useState({});

    const [addSign] = useMutation(ADD_SIGN, {
        onCompleted() {
            router.push("/");
        }
    });

    const handleInput = ({ e, name }: { e: any, name: string }) => {
        setFormState({
            ...formState,
            [name]: e.target.value
        });
    };

    return (
        <div>
            <Link href="/" passHref>
                <a> Back to the homepage</a>
            </Link>
            <br />
            <br />
            <div>
                <div>
                    <label htmlFor="nickname">
                        Nickname:
                    </label>
                    <br />
                    <input
                        id="nickname"
                        type="text"
                        onChange={(e) => handleInput({ e, name: 'nickname' })}
                        placeholder="Your name"
                        style={{minWidth: "300px"}}
                    />
                </div>

                <div>
                    <label htmlFor="content">
                        Leave a message!
                    </label>
                    <br />
                    <textarea
                        id="content"
                        placeholder="Leave a message here!"
                        onChange={(e) => handleInput({ e, name: 'content' })}
                        style={{minWidth: "300px"}}

                    />
                </div>

                <div>
                    <label htmlFor="country" className="text-purple-900 mb-2">
                        If you want, write your country name and its emoji flag
                    </label>
                    <br />
                    <input
                        id="country"
                        type="text"
                        onChange={(e) => handleInput({
                            e, name: 'country'
                        })}
                        placeholder="Country"
                        style={{minWidth: "300px"}}
                    />
                </div>
                <br />
                <br />
                <button
                    className="bg-purple-600 p-4 rounded-lg textgray-50 m-auto mt-4"
                    onClick={() => addSign({ variables: formState })}>
                    Submit
                </button>

            </div>
        </div>
    );

}
export default NewSign;