import type { NextPage } from 'next'
import Link from 'next/link';
import { Box, Text, Avatar, Center, VStack, useColorModeValue } from '@chakra-ui/react';
import { User } from '../../data/users';

const UserCard: NextPage<User> = (props) => {   
    return (
        <Link href={`/user/${props.username}`} passHref>
            <a>
                <VStack
                    spacing="4"
                    borderRadius="md"
                    boxShadow="xl"
                    padding="5"
                    backgroundColor={ useColorModeValue('twitter.50', 'twitter.500')}>
                    <Center>
                        <Avatar size="xl" src={props.avatar} />
                    </Center>
                    <Center>
                        <Box textAlign="center">
                            <Text fontWeight="bold" fontSize="xl">
                                {props.first_name} {props.last_name}
                            </Text>
                            <Text fontSize="xs"> {props.job_title}</Text>
                        </Box>
                    </Center>
                </VStack>
            </a>
        </Link >
    );
}
export default UserCard;