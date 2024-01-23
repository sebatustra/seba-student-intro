import { Card } from './Card'
import { FC, useEffect, useState } from 'react'
import { StudentIntro } from '../models/StudentIntro'
import * as web3 from '@solana/web3.js'
import { IntroCoordinator } from '../coordinators/IntroCoordinator'
import { Center, HStack, Button, Spacer, Input } from '@chakra-ui/react'

export const StudentIntroList: FC = () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
    const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([])
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        IntroCoordinator.fetchPage(
            connection,
            page,
            5,
            search,
            search !== ""
        ).then(setStudentIntros)
    }, [page, search])
    
    return (
        <div>
            <Center>
                <Input
                    id='search'
                    color='gray.400'
                    onChange={event => setSearch(event.currentTarget.value)}
                    placeholder='Search'
                    w='97%'
                    mt={2}
                    mb={2}
                />
            </Center>
            {
                studentIntros.map((studentIntro, i) => <Card key={i} studentIntro={studentIntro} /> )
            }
            <Center>
                <HStack w='full' mt={2} mb={8} ml={4} mr={4}>
                    {
                    page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>
                    }
                    <Spacer />
                    {
                    IntroCoordinator.accounts.length > page * 5 &&
                        <Button onClick={() => setPage(page + 1)}>Next</Button>
                    }
                </HStack>
            </Center>
        </div>
    )
}