"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/handlebars/loader");
class AbstractDumper {
    constructor({ assertPresent, fs, logger, chalk, constants, mkdirp, Handlebars }) {
        assertPresent({
            fs,
            logger,
            chalk,
            constants,
            mkdirp,
            Handlebars,
        });
        this.fs = fs;
        this.logger = logger;
        this.chalk = chalk;
        this.constants = constants;
        this.mkdirp = mkdirp;
        this.Handlebars = Handlebars;
    }
    writeFile(relativeFilePath, content) {
        const fileName = `${this.projectPath}/${relativeFilePath}`;
        if (this.fs.existsSync(fileName)) {
            this.logger.log(`  ${this.chalk.yellow('skip')} ${relativeFilePath} - already exists.`);
            return;
        }
        this.fs.writeFileSync(fileName, content);
        this.logger.log(`  ${this.chalk.green('create')} ${relativeFilePath}`);
    }
    copyHandleBarsTemplate(source, target, context) {
        const templatePath = `${__dirname}/templates/${this.templateFolder}/${source}`;
        if (context && Object.keys(context).length > 0) {
            const handlebarsTemplate = () => this.Handlebars.compile(this.fs.readFileSync(templatePath, 'utf-8'), { noEscape: true });
            return this.writeFile(target, handlebarsTemplate()(context));
        }
        return this.writeFile(target, this.fs.readFileSync(templatePath, 'utf-8'));
    }
    async dump(dumperConfig, schema) {
        const cwd = this.constants.CURRENT_WORKING_DIRECTORY;
        this.projectPath = dumperConfig.appConfig.appName
            ? `${cwd}/${dumperConfig.appConfig.appName}`
            : cwd;
        await this.mkdirp(this.projectPath);
        await this.createFiles(dumperConfig, schema);
    }
}
exports.default = AbstractDumper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtZHVtcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2R1bXBlcnMvYWJzdHJhY3QtZHVtcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EseUNBQXVDO0FBRXZDLE1BQThCLGNBQWM7SUFpQjFDLFlBQXNCLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO1FBQ3ZGLGFBQWEsQ0FBQztZQUNaLEVBQUU7WUFDRixNQUFNO1lBQ04sS0FBSztZQUNMLFNBQVM7WUFDVCxNQUFNO1lBQ04sVUFBVTtTQUNYLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUlTLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPO1FBQzNDLE1BQU0sUUFBUSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBRTNELElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxnQkFBZ0Isb0JBQW9CLENBQUMsQ0FBQztZQUN4RixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVTLHNCQUFzQixDQUM5QixNQUFjLEVBQ2QsTUFBYyxFQUNkLE9BQWlDO1FBRWpDLE1BQU0sWUFBWSxHQUFHLEdBQUcsU0FBUyxjQUFjLElBQUksQ0FBQyxjQUFjLElBQUksTUFBTSxFQUFFLENBQUM7UUFFL0UsSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFLENBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRTNGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFvQixFQUFFLE1BQVk7UUFDM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTztZQUMvQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDNUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUVSLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0Y7QUE1RUQsaUNBNEVDIn0=