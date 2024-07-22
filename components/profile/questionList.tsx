'use client';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Textarea } from '@nextui-org/input';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useState } from 'react';
import { BiLike, BiRepost } from "react-icons/bi";
import { MdOutlineComment } from "react-icons/md";



export const QuestionList: React.FC = ({question: questionData}) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <Card key={questionData.questionId} className="p-4">
						<CardHeader className="flex items-center space-x-4 pb-2">
							<Avatar
								isBordered
								radius="full"
								size="md"
								src="https://nextui.org/avatars/avatar-1.png"
							/>
							<div>
								<p className="font-semibold">{questionData.username}</p>
								<p className="text-small text-default-500">                        
							{formatDistanceToNow(parseISO(questionData.createdAt), { addSuffix: true, unit: 'hour' })}</p>
							</div>
						</CardHeader>
						<CardBody className="py-2">
							<p className="text-base">{questionData.content}</p>
						</CardBody>
						<CardFooter className="flex flex-col items-start pt-2">
							<div className="flex items-center justify-start w-full mb-2">
								<p className="text-small text-default-500 mr-2">{questionData.likeCount} likes</p>
								<p className="text-small text-default-500">{questionData.commentCount} comments</p>
							</div>
							<Divider className="my-2" />
							<div className="flex items-center justify-around w-full">
								<Button
									size="md"
									variant="light"
									startContent={<BiLike />}
								>
									Like
								</Button>
								<Button
									size="md"
									variant="light"
									startContent={<MdOutlineComment />}
									onClick={() => setShowComments(!showComments)}
								>
									Comment
								</Button>
								<Button
									size="md"
									variant="light"
									startContent={<BiRepost />}
								>
									Share
								</Button>
							</div>
							{showComments && (
								<>
									<Divider className="my-2" />
									<div className="w-full space-y-2">
										{/* Existing comments would go here */}
										<div className="flex items-start  space-x-2">
											<Avatar
												size="sm"
												src="https://nextui.org/avatars/avatar-2.png"
											/>
											<div className="bg-default-100 rounded-lg p-2">
												<p className="font-semibold text-small">Commenter</p>
												<p className="text-small">This is a comment.</p>
											</div>
										</div>
										{/* Add comment input */}
										<div className="flex items-center space-x-2 mt-2">
											<Avatar
												size="sm"
												src={
													
													'https://nextui.org/avatars/avatar-3.png'
												}
											/>
											<Textarea
												placeholder="Write a comment..."
												minRows={1}
												className="flex-grow"
												endContent={
													<Button
														size="sm"
														color="secondary"
														variant="bordered"
													>
														Post
													</Button>
												}
											/>
										</div>
									</div>
								</>
							)}
						</CardFooter>
					</Card>
    )