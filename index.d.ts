// Type definitions for twitch-js 1.2
// Project: @types/twitch-js
// Definitions by: Jordan Hitch https://github.com/dfoverdx

export as namespace tmi;

declare global {
    interface String {
        /**
         * Returns true if searchString appears as a substring of the result of converting this object to a String, at
         * one or more positions that are greater than or equal to position; otherwise, returns false.
         *
         * @param {string} searchString — search string
         * @param {number} [position] — If position is undefined, 0 is assumed, so as to search all of the String.
         */
        includes(searchString: string, position: number): boolean;

        /**
         * Returns true if the sequence of elements of searchString converted to a String is the same as the
         * corresponding elements of this string starting at position. Otherwise returns false.
         *
         * @param {string} searchString search string
         * @param {number} position If position is undefined, 0 is assumed, so as to search all of the String.
         */
        startsWith(searchString: string, position: number): boolean;
    }

    interface ObjectConstructor {
        /**
         * Sets the prototype of a specified object o to object proto or null. Returns the object o.
         * @param {any} o The object to change its prototype.
         * @param {object|null} prototype The value of the new prototype or null.
         */
        setPrototypeOf(o: any, prototype: object|null): any;
    }
}

import { EventEmitter } from 'events';

declare class TwitchJSClient extends EventEmitter {
    constructor(opts?: clientOpts);

    // fields
    emotes: string;
    emotesets: object;
    currentLatency: number;
    globaluserstate: object;
    lastJoined: string;
    latency: Date;
    moderators: object;
    pingLoop: any;
    pingTimeout: number;
    reason: string;
    userstate: object;
    utils: utils;
    wasCloseCalled: boolean;
    ws: any;

    // fields pulled from opts
    opts: clientOpts;
    channels: string[];
    maxReconnectAttempts: number;
    maxReconnectInterval: number;
    reconnect: boolean;
    reconnectDecay: number;
    reconnectInterval: number;
    secure: boolean;
    server: string;
    port: number;
    username: string;
    password: string;
    clientId: string;
    logger: logger;

    // API
    api(options: object, cb: Function): Promise<any>;

    // Commands
    /**
     * Send an action message on a channel. (/me <message>) 
     * 
     * Resolved on message sent¹  
     * Rejected on request timed out
     *
     * ¹ There is no possible way to know if a message has been sent successfully unless we create two connections. This
     *   promise will **always** be resolved unless you are trying to send a message and you're not connected to a 
     *   server.
     * 
     * @param channel Channel name (Required)
     * @param message Message (Required)
     */
    action(channel: string, message: string): Promise<[string, string]>;

    /**
     * Ban username on channel.
     * 
     * Resolved on [ban_success](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [already_banned](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [bad_ban_admin](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [bad_ban_broadcaster](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [bad_ban_global_mod](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [bad_ban_self](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [bad_ban_staff](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [usage_ban](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) 
     *     or request timed out
     * 
     * @param channel Channel name (Required)
     * @param username Username to ban (Required)
     * @param reason Reason for the ban (Optional)
     */
    ban(channel: string, username: string, reason?: string): Promise<[string, string, string]>;
    
    /**
     * Clear all messages on a channel.
     * 
     * Resolved on [clearchat](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#clearchat) event  
     * Rejected on [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [usage_clear](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)
     *     or request timed out
     * 
     * @param channel Channel name (Required)
     */
    clear(channel: string): Promise<[string]>;
    
    /**
     * Change the color of your username.
     * 
     * **NOTE**:
     * Turbo users can change their color using hexadecimal color (like `#000000` or `#FFFFFF`) and 
     * non-turbo users can choose one of the following colors:
     * `Blue`, `BlueViolet`, `CadetBlue`, `Chocolate`, `Coral`, `DodgerBlue`, `Firebrick`, `GoldenRod`, `Green`, 
     * `HotPink`, `OrangeRed`, `Red`, `SeaGreen`, `SpringGreen`, `YellowGreen`
     * 
     * Resolved on [color_changed](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [turbo_only_color](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [usage_color](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     * 
     * @param newColor Color name (required)
     */
    color(newColor: 'Blue' | 'BlueViolet' | 'CadetBlue' | 'Chocolate' | 'Coral' | 'DodgerBlue' | 'Firebrick' | 'GoldenRod' | 'Green' | 'HotPink' | 'OrangeRed' | 'Red' | 'SeaGreen' | 'SpringGreen' | 'YellowGreen'): Promise<[string]>;
    
    /**
     * Change the color of your username.
     * 
     * **NOTE**:
     * Turbo users can change their color using hexadecimal color (like `#000000` or `#FFFFFF`) and 
     * non-turbo users can choose one of the following colors:
     * `Blue`, `BlueViolet`, `CadetBlue`, `Chocolate`, `Coral`, `DodgerBlue`, `Firebrick`, `GoldenRod`, `Green`, 
     * `HotPink`, `OrangeRed`, `Red`, `SeaGreen`, `SpringGreen`, `YellowGreen`
     * 
     * Resolved on [color_changed](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [turbo_only_color](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [usage_color](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     * 
     * @param newColorHexCode Color hexcode (required)
     */
    color(newColorHexCode: string): Promise<[string]>;
    
    /**
     * Run commercial on a channel for X seconds. Available lengths (seconds) are `30`, `60`, `90`, `120`, `150`, `180`.
     * 
     * Resolved on [commercial_success](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [bad_commercial_error](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [usage_commercial](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     *
     * @param channel Channel name (Required)
     * @param seconds Commercial lengths (Required)
     */
    commercial(channel: string, seconds: 30|60|90|120|150|180): Promise<[string, number]>;

    /**
     * Connect to server.
     * 
     * Resolved once connected to the server¹  
     * Rejected if disconnected from server
     * 
     * ¹ Only fire once, will not fire upon reconnection.
     */
    connect(): Promise<[string, number]>;

    /**
     * Disconnect from server.
     * 
     * Resolved when the socket is closed  
     * Rejected if socket is already closed
     */
    disconnect(): Promise<[string, number]>;
    
    /**
     * Enable emote-only on a channel.
     * 
     * Resolved on [emote_only_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [usage_emote_only_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [already_emote_only_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or request
     *     timed out
     * 
     * @param channel Channel name (Required)
     */
    emoteonly(channel: string): Promise<[string]>;

    /**
     * Disable emote-only on a channel.
     * 
     * Resolved on [emote_only_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [usage_emote_only_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [already_emote_only_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or request
     *     timed out
     * 
     * @param channel Channel name (Required)
     */
    emoteonlyoff(channel: string): Promise<[string]>;
    
    /**
     * Enable followers-only on a channel.
     * 
     * Resolved on [ROOMSTATE](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     * 
     * @param channel Channel name (Required)
     * @param minutes Length in minutes (Optional, default is `30`)
     */
    followersonly(channel: string, minutes?: number): Promise<[string, number]>;

    /**
     * Alias of {@see followersonly}.
     */
    followersmode(channel: string, minutes?: number): Promise<[string, number]>;
    
    /**
     * Disabled followers-only on a channel.
     * 
     * Resolved on [ROOMSTATE](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     * 
     * @param channel Channel name (Required)
     */
    followersonlyoff(channel: string): Promise<[string]>;
    
    /**
     * Alias of {@see followersonlyoff}.
     */
    followersmodeoff(channel: string): Promise<[string]>;
    
    /**
     * Host a channel.
     * 
     * Resolved on [hosts_remaining](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [bad_host_hosting](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [bad_host_rate_exceeded](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [usage_host](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) 
     *     or request timed out
     * 
     * @param channel Channel name (Required)
     * @param target Channel to host (Required)
     */
    host(channel: string, target: string): Promise<[string, string]>;
    
    /**
     * Join a channel.
     * 
     * Resolved on success  
     * Rejected on [msg_channel_suspended](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) 
     *     or request timed out
     * 
     * @param channel Channel name (Required)
     */
    join(channel: string): Promise<[string]>;
    
    /**
     * Mod username on channel.
     * 
     * Resolved on [mod_success](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [usage_mod](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [bad_mod_banned](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [bad_mod_mod](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) 
     *     or request timed out
     * 
     * @param channel Channel name (Required)
     * @param username Username to add as a moderator (Required)
     */
    mod(channel: string, username: string): Promise<[string, string]>;
    
    /**
     * Get list of mods on a channel.
     * 
     * Resolved on [room_mods](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     [no_mods](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [usage_mods](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     * 
     * @param channel Channel name (Required)
     * @returns Promise representing an array of mods' usernames
     */
    mods(channel: string): Promise<string[]>;
    

    /**
     * Leave a channel.
     * 
     * Resolved on leaving a channel  
     * Rejected on request timed out
     * 
     * @param channel Channel name (Required)
     */
    part(channel: string): Promise<[string]>;

    /**
     * Alias of {@see part}.
     */
    leave(channel: string): Promise<[string]>;
    
    /**
     * Send a PING to the server.
     * 
     * Resolved on [PONG](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#pong) received  
     * Rejected on request timed out
     */
    ping(): Promise<void>;
    
    /**
     * Enable R9KBeta on a channel.
     * 
     * Resolved on [r9k_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [usage_r9k_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [already_r9k_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or request 
     *     timed out
     * 
     * @param channel Channel name (Required)
     */
    r9kbeta(channel: string): Promise<[string]>;
    
    /**
     * Alias of {@see r9kbeta}.
     */
    r9kmode(channel: string): Promise<[string]>;

    /**
     * Disable R9KBeta on a channel.
     * 
     * Resolved on [r9k_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [usage_r9k_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [already_r9k_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or request 
     *     timed out
     * 
     * @param channel Channel name (Required)
     */
    r9kbetaoff(channel: string): Promise<[string]>;

    /**
     * Alias of {@see r9kbetaoff}.
     */
    r9kmodeoff(channel: string): Promise<[string]>;
    
    /**
     * Send a RAW message to the server.
     * 
     * Resolved on message sent  
     * Rejected on request timed out
     * 
     * @param message Message to send to the server (Required)
     */
    raw(message: string): Promise<[string]>;
    
    /**
     * Send a message on a channel.
     * 
     * Resolved on message sent¹  
     * Rejected on request timed out
     * 
     * ¹ There is no possible way to know if a message has been sent successfully unless we create two connections. This
     *   promise will **always** be resolved unless you are trying to send a message and you're not connected to server. 
     * 
     * @param channel Channel name (Required)
     * @param message Message (Required)
     */
    say(channel: string, message: string): Promise<[string, string]>;
    
    /**
     * Enable slow on a channel.
     * 
     * Resolved on success  
     * Rejected on [usages_slow_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     * 
     * @param channel Channel name (Required)
     * @param seconds Length in seconds (Optional, default is `300`)
     */
    slow(channel: string, seconds?: number): Promise<[string, number]>;

    /**
     * Alias of {@see slow}.
     */
    slowmode(channel: string, seconds?: number): Promise<[string, number]>;

    /**
     * Disable slow mode on a channel.
     * 
     * Resolved on success  
     * Rejected on [usage_slow_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice), 
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or request 
     *     timed out
     * 
     * @param channel Channel name (Required)
     */
    slowoff(channel: string): Promise<[string]>;

    /**
     * Alias of {@see slowoff}.
     */
    slowmodeoff(channel: string): Promise<[string]>;
    
    /**
     * Enable subscribers-only on a channel.
     * 
     * Resolved on [subs_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [usage_subs_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [already_subs_on](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     * 
     * @param channel Channel name (Required)
     * @param minutes Length in minutes (Optional, default is `30`)
     */
    subscribers(channel: string): Promise<[string]>;

    /**
     * Disabled subscriber-only on a channel.
     * 
     * Resolved on [subs_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice)  
     * Rejected on [usage_subs_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [already_subs_off](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice),
     *     [no_permission](https://github.com/twitch-apis/twitch-js/blob/master/docs/Chat/Events.md#notice) or 
     *     request timed out
     * 
     * @param channel Channel name (Required)
     */
    subscribersoff(channel: string): Promise<[string]>;
    
    /**
     * Timeout username on channel for X seconds.
     * 
     * Resolved on timeout_success  
     * Rejected on usage_timeout, bad_timeout_admin, bad_timeout_broadcaster, bad_timeout_global_mod, bad_timeout_self, 
     *     bad_timeout_staff, no_permission or request timed out
     * 
     * @param channel Channel name (Required)
     * @param username Username to timeout (Required)
     * @param seconds Length in seconds (Optional, default is `300`)
     * @param reason Reason for the timeout (Optional)
     */
    timeout(channel: string, username: string, seconds?: number, reason?: string):
        Promise<[string, string, number, string]>;
    
    /**
     * Unban username on channel.
     * 
     * Resolved on unban_success  
     * Rejected on usage_unban, bad_unban_no_ban, no_permission or request timed out
     * 
     * @param channel Channel name (Required)
     * @param username Username to unban (Required)
     */
    unban(channel: string, username: string): Promise<[string, string]>;

    /**
     * End the current hosting. You must be the broadcaster or an editor.
     * 
     * Resolved on success  
     * Rejected on usage_unhost, not_hosting, no_permission or request timed out
     * 
     * @param channel Channel name (Required)
     */
    unhost(channel: string): Promise<[string]>;

    /**
     * Unmod user on channel.
     * 
     * Resolved on unmod_success  
     * Rejected on usage_unmod, bad_unmod_mod, no_permission or request timed out
     * 
     * @param channel Chananel name (Required)
     * @param username Username to unmod (Required)
     */
    unmod(channel: string, username: string): Promise<[string, string]>;

    /**
     * Send an instant message to a user.
     * 
     * Resolved on message sent¹  
     * Rejected on request timed out
     * 
     * 1: There is no possible way to know if a message has been sent successfully unless we create two connections.
     * This promise will always be resolved unless you are trying to send a message and you're not connected to server. 
     * 
     * @param username Username (Required)
     * @param message Message (Required)
     */
    whisper(username: string, message: string): Promise<[string, string]>;

    // Events
    handleMessage(message: string): void;

    // Field accessors
    /**
     * Get the current username.
     */
    getUsername(): string;

    /**
     * Get the current options.
     */
    getOptions(): clientOpts;

    /**
     * Get the current channels.
     */
    getChannels(): string[];

    // Misc
    /**
     * NOT RECOMMENDED
     * 
     * Function to check if the user is a mod on a channel.
     * 
     * Important: Might not be accurate.
     * 
     * @param channel Channel name
     * @param username Username
     */
    isMod(channel: string, username: string): boolean;

    /**
     * Get the current state of the socket.
     */
    readyState(): 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED';
}

export const client: typeof TwitchJSClient;
export const Client: typeof TwitchJSClient;

interface clientOpts {
    /**
     * List of channels to join when connected
     */
    channels: string[];

    connection: connectionOptions;
    identity: identityOptions;
    options: optionsOptions;

    /**
     * Custom logger with the methods info, warn, and error
     */
    logger: logger;
}

interface connectionOptions {
    /**
     * Connect to this server *(Overrides cluster and connect to this server instead)*
     */
    server: string;

    /**
     * Connect on this port (Default: `80`)
     */
    port: number;

    /**
     * Reconnect to Twitch when disconnected from server (Default: `false`)
     */
    reconnect: boolean;

    /**
     * Max number of reconnection attempts (Default: `Infinity`)
     */
    maxReconnectAttempts: number;

    /**
     * Max number of ms to delay a reconnection (Default: `30000`)
     */
    maxReconnectInterval: number;

    /**
     * The rate of increase of the reconnect delay (Default: `1.5`)
     */
    reconnectDecay: number;

    /**
     * Number of ms before attempting to reconnect (Default: `1000`)
     */
    reconnectInterval: number;

    /**
     * Use secure connection (SSL / HTTPS) *(Overrides port to 443)*
     */
    secure: boolean;

    /**
     * Number of ms to disconnect if no responses from server (Default: `9999`)
     */
    timeout: number;
}

interface identityOptions {
    /**
     * Username on Twitch
     */
    username: string;

    /**
     * [OAuth password](http://twitchapps.com/tmi/) on Twitch
     */
    password: string;
}

interface optionsOptions {
    /**
     * Used to identify your application to the API (Default: `null`)
     */
    clientId: string;

    /**
     * Show debug messages in console (Default: `false`)
     */
    debug: boolean;

    /**
     * Number of ms before command will timeout if no response from server (Default: `600`)
     */
    commandTimeout: number;
}

declare enum level {
    trace = 0,
    debug = 1,
    info = 2,
    warn = 3,
    error = 4,
    fatal = 5
}

interface logger {
    setLevel(level: level): void;
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
}

interface utils {
    levenshtein(s1: string, s2: string, caseSensitive?: boolean): number;
    raffle: raffle;
    symbols(line: string): number;
    uppercase(line: string): number;
}

interface raffle {
    init(channel: string): void;
    enter(channel: string, username: string): void;
    leave(channel: string, username: string): boolean;
    pick(channel: string): string;
    reset(channel: string): void;
    count(channel: string): number;
    isParticipating(channel: string, username: string): boolean;
}

export namespace tmi {
    export const client: typeof TwitchJSClient;
}