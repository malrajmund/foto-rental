import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, TabContent, TabPane, Jumbotron, Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Form, Input, Button, Spinner } from 'reactstrap';
import { connect } from "react-redux";
import { getChats, addMessage } from '../../actions/chat';

const DashboardChat = ({ auth: { user }, getChats, addMessage, chat: { chats, loading } }) => {
    useEffect(() => {
        getChats();
    }, [getChats]);
    const [activeTab, setActiveTab] = useState('0');
    const setTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    var user_chats = [];
    if (!loading) {
        chats.map((chat) => {
            if (chat.sender === user?._id || chat.receiver === user?._id) {
                user_chats.push(chat)
            }
        })
    }
    const [message_text, setMessage] = useState("");
    const onSubmit = (e, id) => {
        e.preventDefault();
        addMessage(message_text, id);
        window.location.reload();
    }
    return (
        <div id='asdasd'>
            <div id='dashboard_container'>
                <Nav tabs id='dashboard_tabs'>
                    <NavItem>
                        <NavLink href='dashboard' className='navlink_unactive'>Konto</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={`/myOffers/${user?._id}`} className='navlink_unactive'>Moje oferty</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={`/myReservations/${user?._id}`} className='navlink_unactive'>Moje rezerwacje</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='active'>Wiadomości</NavLink>
                    </NavItem>
                </Nav>
                <div id='tab_separator'></div>
                <TabContent activeTab='4'>
                    <TabPane tabId='4'>
                        <Jumbotron fluid>
                            <div className='jumbotron_content'>
                                <h2 className='display-4'>Wiadomości</h2>
                                <hr className='my-2 separator' />
                                <Container fluid>
                                    <Row>
                                        <Col sm='4' className='no_padding_col'>
                                            <ListGroup id='chatuser_list'>
                                                {loading ? (
                                                    <Spinner color='primary' className='load_spinner' />
                                                ) : (
                                                        <>
                                                            {user_chats.length ? (<>
                                                                {user_chats.map((chat, i) => (<>
                                                                    <ListGroupItem onClick={() => { setTab(`${i}`); }} action>
                                                                        <ListGroupItemHeading>{user?._id === chat.sender ? chat.receiverName : chat.senderName}
                                                                            <div id='heading_date'>{chat.date.slice(0, -14) + " " + chat.date.slice(-13, -8)}</div>
                                                                            {/* <Badge pill color='warning'>3</Badge> */}
                                                                        </ListGroupItemHeading>
                                                                        <ListGroupItemText>
                                                                            {chat.message[chat.message.length - 1]?.text}
                                                                        </ListGroupItemText>
                                                                    </ListGroupItem>
                                                                </>
                                                                ))}
                                                            </>
                                                            ) : (
                                                                    <div className='empty_offer_array'>
                                                                        <h1 className='display-4'>
                                                                            Pusto...</h1>
                                                                    </div>
                                                                )}
                                                        </>
                                                    )}
                                            </ListGroup>
                                        </Col>
                                        <Col sm='8' className='no_right_padding'>
                                            <div id='chat_container'>
                                                <TabContent activeTab={activeTab}>
                                                    {loading ? (
                                                        <Spinner color='primary' className='load_spinner' />
                                                    ) : (
                                                            <>
                                                                {user_chats.length ? (<>
                                                                    {user_chats.map((chat, i) => (<>
                                                                        <TabPane tabId={`${i}`}>
                                                                            <h4 id='chat_title'>Rozmawiasz z {user?._id === chat.sender ? chat.receiverName : chat.senderName}</h4>
                                                                            <div id='messages_list'>
                                                                                <ListGroup flush>
                                                                                    {chat.message.map((message) => (<>
                                                                                        {(message.direction && user?._id === chat.sender) || (!message.direction && user?._id === chat.receiver) ? (<>
                                                                                            <ListGroupItem id='message_body_alt'>
                                                                                                <div id='message_info_alt'>{message.date.slice(0, -14) + " " + message.date.slice(-13, -8)}</div>
                                                                                                <div id='message_content_alt'>
                                                                                                    {message.header ? (<div id='message_header_alt'>{message.header}</div>) : (<></>)}
                                                                                                    {message.text}
                                                                                                </div>
                                                                                            </ListGroupItem>
                                                                                        </>) : (<>
                                                                                            <ListGroupItem id='message_body'>
                                                                                                <div id='message_info'>{message.date.slice(0, -14) + " " + message.date.slice(-13, -8)}</div>
                                                                                                <div id='message_content'>
                                                                                                    {message.header ? (<div id='message_header'>{message.header}</div>) : (<></>)}
                                                                                                    {message.text}
                                                                                                </div>
                                                                                            </ListGroupItem>
                                                                                        </>)}
                                                                                    </>))}
                                                                                </ListGroup>
                                                                            </div>
                                                                            <Form onSubmit={(e, id) => onSubmit(e, chat?._id)}>
                                                                                <Row>
                                                                                    <Col sm='10' className='no_right_padding'>
                                                                                        <Input type='text' id='message' name='message' value={message_text} onChange={(e) => setMessage(e.target.value)} placeholder='Wyślij wiadomość...' />
                                                                                    </Col>
                                                                                    <Col sm='2' className='no_left_padding'>
                                                                                        <Button type='submit' id='send_message_btn' color='info'>Wyślij</Button>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form>
                                                                        </TabPane>
                                                                    </>))}
                                                                </>) : (
                                                                        <div className='empty_offer_array'>
                                                                            <h1 className='display-4'>
                                                                                Brak wiadomości</h1>
                                                                        </div>
                                                                    )}
                                                            </>)}

                                                </TabContent>

                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Jumbotron>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
}

DashboardChat.propTypes = {
    getChats: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    chat: state.chat,
    auth: state.auth,
});

export default connect(mapStateToProps, { getChats, addMessage })(DashboardChat);
