import { Json } from "../lang/type";

export class MqttClient {
	onConnectionLost: (any);
	onMessageArrived: (any);

	constructor(host: string, port: number, clientId: string);

	/**
	 * Connect this Messaging client to its server.
	 *
	 * @name Paho.MQTT.Client#connect
	 * @function
	 * @param {object} connectOptions - Attributes used with the connection.
	 * @param {number} connectOptions.timeout - If the connect has not succeeded within this
	 *                    number of seconds, it is deemed to have failed.
	 *                    The default is 30 seconds.
	 * @param {string} connectOptions.userName - Authentication username for this connection.
	 * @param {string} connectOptions.password - Authentication password for this connection.
	 * @param {Paho.MQTT.Message} connectOptions.willMessage - sent by the server when the client
	 *                    disconnects abnormally.
	 * @param {number} connectOptions.keepAliveInterval - the server disconnects this client if
	 *                    there is no activity for this number of seconds.
	 *                    The default value of 60 seconds is assumed if not set.
	 * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
	 *                    persistent state is deleted on successful connect.
	 * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
	 * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
	 * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
	 *                    has been received from the server.
	 * A single response object parameter is passed to the onSuccess callback containing the following fields:
	 * <ol>
	 * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
	 * </ol>
 * @param {function} connectOptions.onFailure - called when the connect request has failed or timed out.
	 * A single response object parameter is passed to the onFailure callback containing the following fields:
	 * <ol>
	 * <li>invocationContext as passed in to the onFailure method in the connectOptions.
	 * <li>errorCode a number indicating the nature of the error.
	 * <li>errorMessage text describing the error.
	 * </ol>
 * @param {array} connectOptions.hosts - If present this contains either a set of hostnames or fully qualified
	 * WebSocket URIs (ws://iot.eclipse.org:80/ws), that are tried in order in place
	 * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
	 * one of then succeeds.
 * @param {array} connectOptions.ports - If present the set of ports matching the hosts. If hosts contains URIs, this property
	 * is not used.
 * @param {boolean} connectOptions.reconnect - Sets whether the client will automatically attempt to reconnect
 * to the server if the connection is lost.
 *<ul>
*<li>If set to false, the client will not attempt to automatically reconnect to the server in the event that the
* connection is lost.</li>
*<li>If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server.
* It will initially wait 1 second before it attempts to reconnect, for every failed reconnect attempt, the delay
* will double until it is at 2 minutes at which point the delay will stay at 2 minutes.</li>
*</ul>
* @param {number} connectOptions.mqttVersion - The version of MQTT to use to connect to the MQTT Broker.
*<ul>
*<li>3 - MQTT V3.1</li>
*<li>4 - MQTT V3.1.1</li>
*</ul>
* @param {boolean} connectOptions.mqttVersionExplicit - If set to true, will force the connection to use the
* selected MQTT Version or will fail to connect.
* @param {array} connectOptions.uris - If present, should contain a list of fully qualified WebSocket uris
* (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port parameter of the construtor.
* The uris are tried one at a time in order until one of them succeeds. Do not use this in conjunction with hosts as
* the hosts array will be converted to uris and will overwrite this property.
	* @throws {InvalidState} If the client is not in disconnected state. The client must have received connectionLost
	* or disconnected before calling connect for a second or subsequent time.
	*/
	connect(connectOptions)

	reconnect();

	/**
	 * Publish a message to the consumers of the destination in the Message.
	 * Synonym for Paho.Mqtt.Client#send
	 *
	 * @name Paho.MQTT.Client#publish
	 * @function
	 * @param {string|Paho.MQTT.Message} topic - <b>mandatory</b> The name of the topic to which the message is to be published.
	 * 					   - If it is the only parameter, used as Paho.MQTT.Message object.
	 * @param {String|Uint8Array} payload - The message data to be published.
	 * @param {number} qos The Quality of Service used to deliver the message.
	 * 		<dl>
	 * 			<dt>0 Best effort (default).
	 *     			<dt>1 At least once.
	 *     			<dt>2 Exactly once.
	 * 		</dl>
	 * @param {Boolean} retained default false,  If true, the message is to be retained by the server and delivered
	 *                     to both current and future subscriptions.
	 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
	 *                     A received message has the retained boolean set to true if the message was published
	 *                     with the retained boolean set to true
	 *                     and the subscrption was made after the message has been published.
	 * @throws {InvalidState} if the client is not connected.
	 */
	publish(topic: string, payload: String | Uint8Array, qos?: number, retained?: boolean)

	/**
	 * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
	 *
	 * @name Paho.MQTT.Client#subscribe
	 * @function
	 * @param {string} filter describing the destinations to receive messages from.
	 * <br>
	 * @param {object} subscribeOptions - used to control the subscription
	 *
	 * @param {number} subscribeOptions.qos - the maiximum qos of any publications sent
	 *                                  as a result of making this subscription.
	 * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
	 *                                  or onFailure callback.
	 * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
	 *                                  has been received from the server.
	 *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
	 *                                  <ol>
	 *                                  <li>invocationContext if set in the subscribeOptions.
	 *                                  </ol>
	 * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
	 *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
	 *                                  <ol>
	 *                                  <li>invocationContext - if set in the subscribeOptions.
	 *                                  <li>errorCode - a number indicating the nature of the error.
	 *                                  <li>errorMessage - text describing the error.
	 *                                  </ol>
	 * @param {number} subscribeOptions.timeout - which, if present, determines the number of
	 *                                  seconds after which the onFailure calback is called.
	 *                                  The presence of a timeout does not prevent the onSuccess
	 *                                  callback from being called when the subscribe completes.
	 * @throws {InvalidState} if the client is not in connected state.
	 */
	subscribe(filter: string, subscribeOptions?: Json)

	/**
	* Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
	*
	* @name Paho.MQTT.Client#unsubscribe
	* @function
	* @param {string} filter - describing the destinations to receive messages from.
	* @param {object} unsubscribeOptions - used to control the subscription
	* @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
										or onFailure callback.
   * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
   *                                    A single response object parameter is passed to the
   *                                    onSuccess callback containing the following fields:
   *                                    <ol>
   *                                    <li>invocationContext - if set in the unsubscribeOptions.
   *                                    </ol>
   * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
   *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
   *                                    <ol>
   *                                    <li>invocationContext - if set in the unsubscribeOptions.
   *                                    <li>errorCode - a number indicating the nature of the error.
   *                                    <li>errorMessage - text describing the error.
   *                                    </ol>
   * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
   *                                    after which the onFailure callback is called. The presence of
   *                                    a timeout does not prevent the onSuccess callback from being
   *                                    called when the unsubscribe completes
   * @throws {InvalidState} if the client is not in connected state.
   */
	unsubscribe(filter: string, unsubscribeOptions: Json)

	/**
	 * Normal disconnect of this Messaging client from its server.
	 *
	 * @name Paho.MQTT.Client#disconnect
	 * @function
	 * @throws {InvalidState} if the client is already disconnected.
	 */
	disconnect()
}

export class Message {
	destinationName: string;
	payloadBytes: Uint8Array;

}