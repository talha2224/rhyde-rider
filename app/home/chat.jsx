import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import driverProfile from '../../assets/images/bookings/driver.png'; // Assuming this is the chat user's image

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello?', time: '11:55 A.M', sender: 'user', status: 'read' },
        { id: '2', text: 'How may I be of help ?', time: '11:56 A.M', sender: 'other', status: 'sent' },
        { id: '3', text: 'I\'m currently waiting for you at the beach beside Rain Cover Avenue', time: '11:57 A.M', sender: 'user', status: 'delivered' },
        { id: '4', text: 'Thanks for reaching out, well it takes...', time: '11:58 A.M', sender: 'other', status: 'sent' },
        { id: '5', text: 'Also, can you send us a picture so I can confirm the location', time: '11:59 A.M', sender: 'other', status: 'sent' },
        { id: '6', text: 'Of course! I will send now', time: '11:55 A.M', sender: 'user', status: 'read' },
    ]);

    const chatUser = {
        name: 'Samuel Prow',
        status: 'Online',
        avatar: driverProfile,
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: String(messages.length + 1),
                text: message.trim(),
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                sender: 'user',
                status: 'sent', // Or 'delivered', 'read' based on real-time updates
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const handleCallPress = () => {
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit number
        const phoneNumber = `tel:${randomNumber}`;
        Linking.openURL(phoneNumber).catch(err => console.error('Failed to open dialer:', err));
    };

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    const renderMessage = (msg) => {
        const isUser = msg.sender === 'user';
        return (
            <View key={msg.id} style={[styles.messageBubble, isUser ? styles.userMessage : styles.otherMessage]}>
                <Text style={[isUser ? styles.messageText : { color: "#fff", fontSize: 16, }]}>{msg.text}</Text>
                <View style={styles.messageFooter}>
                    <Text style={styles.messageTime}>{msg.time}</Text>
                    {isUser && msg.status === 'sent' && <MaterialCommunityIcons name="check" size={12} color="#AAA" />}
                    {isUser && msg.status === 'delivered' && <MaterialCommunityIcons name="check-all" size={12} color="#AAA" />}
                    {isUser && msg.status === 'read' && <MaterialCommunityIcons name="check-all" size={12} color="#4CAF50" />} {/* Green check for read */}
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 :keyboardVisible?0:-40}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Image source={chatUser.avatar} style={styles.chatUserAvatar} />
                <View style={styles.chatUserInfo}>
                    <Text style={styles.chatUserName}>{chatUser.name}</Text>
                    <Text style={styles.chatUserStatus}>{chatUser.status}</Text>
                </View>
                <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
                    <Ionicons name="call-outline" size={24} color="#FFD700" />
                </TouchableOpacity>
            </View>

            {/* Messages Area */}
            <ScrollView contentContainerStyle={styles.messagesContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.dateSeparator}>Today...</Text>
                {messages.map(renderMessage)}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.emojiButton}>
                    <FontAwesome name="smile-o" size={24} color="#AAA" />
                </TouchableOpacity>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Type your message"
                    placeholderTextColor="#AAA"
                    value={message}
                    onChangeText={setMessage}
                    multiline // Allow multiline input
                // Note: keyboardVerticalOffset on KeyboardAvoidingView helps prevent input hiding
                />
                <TouchableOpacity style={styles.imageButton}>
                    <Ionicons name="image-outline" size={24} color="#AAA" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Ionicons name="send" size={24} color="#1C1A1B" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B', // Dark background
        paddingTop: 50, // Adjust for status bar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    backButton: {
        marginRight: 15,
    },
    chatUserAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    chatUserInfo: {
        flex: 1,
    },
    chatUserName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    chatUserStatus: {
        fontSize: 12,
        color: '#4CAF50', // Green for online status
    },
    callButton: {
        padding: 8,
        backgroundColor: '#333',
        borderRadius: 20,
    },
    messagesContainer: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    dateSeparator: {
        textAlign: 'center',
        color: '#AAA',
        fontSize: 12,
        marginVertical: 10,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'column',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#FFD700', // Gold for user messages
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#2A2A2A',
        color: "#fff"
    },
    messageText: {
        fontSize: 16,
        color: '#1C1A1B', // Dark text for user messages
    },
    messageFooter: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
    },
    messageTime: {
        fontSize: 10,
        color: '#1C1A1B', // Dark time text for user messages
        marginRight: 5,
    },
    // Overrides for other message's text and time to be light
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#2A2A2A',
    },
    otherMessageText: {
        color: '#FFF',
    },
    otherMessageTime: {
        color: '#AAA',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#333',
        backgroundColor: '#1C1A1B',
        marginBottom: 0
    },
    emojiButton: {
        padding: 8,
    },
    messageInput: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: '#FFF',
        fontSize: 16,
        maxHeight: 100, // Limit input height for multiline
        marginHorizontal: 5,
    },
    imageButton: {
        padding: 8,
    },
    sendButton: {
        backgroundColor: '#FFD700',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
});

export default Chat;
