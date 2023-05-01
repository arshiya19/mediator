// Participant class represents a participant in the chatroom
class Participant {
  public name: string;
  public chatroom: Chatroom | null;

  constructor(name: string) {
    this.name = name;
    this.chatroom = null;
  }

  // send message to a participant or broadcast to all
  public send(message: string, to?: Participant): void {
    if (this.chatroom) {
      this.chatroom.send(message, this, to);
    }
  }

  // receive message from another participant
  public receive(message: string, from: Participant): void {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

// Chatroom class represents the mediator that enables participants to communicate
class Chatroom {
  private participants: {[key: string]: Participant};

  constructor() {
    this.participants = {};
  }

  // register a participant in the chatroom
  public register(participant: Participant): void {
    this.participants[participant.name] = participant;
    participant.chatroom = this;
  }

  // send message to a participant or broadcast to all
  public send(message: string, from: Participant, to?: Participant): void {
    if (to) {
      // send message to a specific participant
      to.receive(message, from);
    } else {
      // broadcast message to all participants except the sender
      for (const key in this.participants) {
        if (this.participants.hasOwnProperty(key) && this.participants[key] !== from) {
          this.participants[key].receive(message, from);
        }
      }
    }
  }
}

// create participants and register them in the chatroom
const beau = new Participant("Beau");
const quincy = new Participant("Quincy");
const rafael = new Participant("Rafael");
const berkeley = new Participant("Berkeley");
const evaristo = new Participant("Evaristo");

const chatroom = new Chatroom();
chatroom.register(beau);
chatroom.register(quincy);
chatroom.register(rafael);
chatroom.register(berkeley);
chatroom.register(evaristo);

// participants send messages to each other through the chatroom mediator
quincy.send("How's it going?");
beau.send("The YouTube channel is up to 1 million subscribers!", quincy);
rafael.send("The FCC wiki is more popular than Wikipedia!", quincy);
evaristo.send("98% of our graduates got their dream job!", quincy);
berkeley.send("The government forked our repo and is now using it to create world peace!", quincy);
