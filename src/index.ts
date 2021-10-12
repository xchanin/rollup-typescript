/**
 * https://github.com/luixaviles/typescript-rollup
 * 
 * https://www.youtube.com/watch?v=ICYLOZuFMz8
 */
import { LitElement, html, customElement, css, property, TemplateResult } from 'lit-element';
import { env } from './environment/environment';
import { add, substract } from './math';
// import debug from 'debug';
// import FlowTool from './controls/FlowTool';

// const log = debug('app:log');

@customElement('comp-main')
export class CompMain extends LitElement {

    @property({ type: String }) Message: string;
    @property({ type: String }) Mood: string;
    @property({ type: Number }) Count: number;

    constructor() {
        super();

        // debug.enable('*');
        // log('Logging is enabled!');

        const x = 20;
        const y = 10;
        // const flowTool: FlowTool = new FlowTool('My flow tool message!');
        this.Mood = '';
        this.Message = '';
        this.Count = 0;

        console.log(`${x} + ${y} = ${add(x, y)}`)
        console.log(`${x} - ${y} = ${substract(x, y)}`);

        this.addEventListener('click', async (e) => {
            this.Count++;

            /**
             * Returns a promise that resolves when the element has completed updating
             * value is a boolean
             */
            await this.updateComplete;
            this.dispatchEvent(new CustomEvent('count', {detail: {count: this.Count}}));
        })
    }
    
    static styles = css`
    :host {
        display: flex;
    }
    `;

    /**
     * Render method should return a `TemplateResult` using the provided lit-html `html` tag function
     * @returns it-html TemplateResult (e.g. html`Hello ${world}`) to render element DOM
     * Setting properties inside this method will not trigger the element to update.
     * https://www.webcomponents.org/element/@polymer/lit-element
     */
    protected render(): TemplateResult {
        return html`
        <div>
            <h1>${ this.Message }</h1>
            <h2>${ this.Mood }</h2>
            <span>This App uses:</span>
            <ul>
                <li>TypeScript</li>
                <li>Rollup.js</li>
                <li>es-dev-server</li>
            </ul>
            <div style="margin: 10px">Count: ${'#️⃣'.repeat(this.Count)}</div>
            <div style="margin: 10px">Count: ${this.Count}</div>
            <span>Running environment: ${ env.environment }</span>
            <ul>
                <li>Protocol: ${ env.host.protocol }</li>
                <li>Hostname: ${ env.host.hostname }</li>
                <li>Port: ${ env.host.port }</li>
            </ul>
        </div>
        `;
    }
}